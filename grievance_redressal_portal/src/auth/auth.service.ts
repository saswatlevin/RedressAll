import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import { UserStatus } from '../generated/prisma/enums';

import * as argon2 from 'argon2';
import { randomUUID } from 'node:crypto';

import type { Response } from 'express';
import type { AuthUser } from './types/auth-user.type';

import {
    ACCESS_COOKIE_NAME,
    REFRESH_COOKIE_NAME,
    ACCESS_TOKEN_EXPIRATION_SECONDS,
    REFRESH_TOKEN_EXPIRATION_SECONDS,
} from './auth.constants';

@Injectable()
export class AuthService {
    constructor(
        // Injects the PrismaService, JwtService and ConfigService into the AuthService
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    // Checks whether the user's password matches and whether his user_status is active.
    // If so, it returns the user. 
    async validateUser(
        email: string,
        password: string,
    ): Promise<AuthUser> {

        const user = await this.prisma.user.findUnique({
            where: {
                user_email: email,
            },
        });

        if (!user || user.user_status !== UserStatus.active) {
            throw new UnauthorizedException(
                'Invalid email or password',
            );
        }

        const passwordMatches = await argon2.verify(
            user.user_password,
            password,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException(
                'Invalid email or password',
            );
        }

        return this.toAuthUser(user);
    }

    // Returns a user if it is active.
    async getActiveUser(
        userId: number,
    ): Promise<AuthUser> {

        const user = await this.prisma.user.findUnique({
            where: {
                user_id: userId,
            },
        });

        if (!user || user.user_status !== UserStatus.active) {
            throw new UnauthorizedException(
                'User not found or account suspended',
            );
        }

        return this.toAuthUser(user);
    }

    //??
    private toAuthUser(user: {
        user_id: number;
        user_email: string;
        user_role: AuthUser['user_role'];
        user_is_moderator: boolean;
        outlet_id: number | null;
    }): AuthUser {
        return {
            user_id: user.user_id,
            user_email: user.user_email,
            user_role: user.user_role,
            user_is_moderator: user.user_is_moderator,
            outlet_id: user.outlet_id,
        };
    }

    // Token methods are added in Section 8.

    // Cookie options are returned
    private getCookieOptions() {
    return {
        httpOnly: true as const,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'strict' as const,
        path: '/',
    };
}

// Method to clear cookies of access tokens and refresh tokens.
private clearAuthCookies(response: Response): void {
    const options = this.getCookieOptions();

    response.clearCookie(ACCESS_COOKIE_NAME, options);
    response.clearCookie(REFRESH_COOKIE_NAME, options);
}

private async issueTokens(
    user: AuthUser,
    response: Response,
    previousRefreshHash?: string,
): Promise<{ user: AuthUser }> {

    // Access token defintion
    const accessToken = await this.jwtService.signAsync(
        {
            sub: user.user_id,
            typ: 'access',
            jti: randomUUID(),
        },
        {
            secret: this.configService.getOrThrow<string>(
                'JWT_ACCESS_TOKEN_SECRET',
            ),
            expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
            algorithm: 'HS256',
        },
    );

    // Refresh token definition
    const refreshToken = await this.jwtService.signAsync(
        {
            sub: user.user_id,
            typ: 'refresh',
            jti: randomUUID(),
        },
        {
            secret: this.configService.getOrThrow<string>(
                'JWT_REFRESH_TOKEN_SECRET',
            ),
            expiresIn: REFRESH_TOKEN_EXPIRATION_SECONDS,
            algorithm: 'HS256',
        },
    );

    //?
    const newRefreshHash = await argon2.hash(refreshToken);

    if (previousRefreshHash !== undefined) {
        // Refresh rotation: only replace the hash if
        // another request has not already changed it.

        const result = await this.prisma.user.updateMany({
            where: {
                user_id: user.user_id,
                user_status: UserStatus.active,
                refresh_token_hash: previousRefreshHash,
            },
            data: {
                refresh_token_hash: newRefreshHash,
            },
        });

        if (result.count !== 1) {
            throw new UnauthorizedException(
                'Refresh token is no longer valid',
            );
        }

    } else {
        // Normal login: replace any previous session.

        await this.prisma.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                refresh_token_hash: newRefreshHash,
            },
        });
    }

    const cookieOptions = this.getCookieOptions();

    response.cookie(ACCESS_COOKIE_NAME, accessToken, {
        ...cookieOptions,
        maxAge: ACCESS_TOKEN_EXPIRATION_SECONDS * 1000,
    });

    response.cookie(REFRESH_COOKIE_NAME, refreshToken, {
        ...cookieOptions,
        maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS * 1000,
    });

    return { user };
}

async login(
    user: AuthUser,
    response: Response,
): Promise<{ user: AuthUser }> {

    // Recheck status immediately before issuing tokens.
    const activeUser = await this.getActiveUser(user.user_id);

    return this.issueTokens(activeUser, response);
}

//?
private async checkRefreshToken(
    userId: number,
    refreshToken: string,
): Promise<{
    user: AuthUser;
    storedHash: string;
}> {

    if (
        !Number.isSafeInteger(userId) ||
        userId <= 0 ||
        typeof refreshToken !== 'string' ||
        !refreshToken
    ) {
        throw new UnauthorizedException(
            'Invalid refresh token',
        );
    }

    const dbUser = await this.prisma.user.findUnique({
        where: {
            user_id: userId,
        },
    });

    if (
        !dbUser ||
        dbUser.user_status !== UserStatus.active ||
        !dbUser.refresh_token_hash
    ) {
        throw new UnauthorizedException(
            'Invalid refresh token',
        );
    }

    const matches = await argon2.verify(
        dbUser.refresh_token_hash,
        refreshToken,
    );

    if (!matches) {
        throw new UnauthorizedException(
            'Invalid refresh token',
        );
    }

    return {
        user: this.toAuthUser(dbUser),
        storedHash: dbUser.refresh_token_hash,
    };
}

// Checks whether the refresh token matches the Argon2 hash currently stored for the user in the database
async verifyUserRefreshToken(
    userId: number,
    refreshToken: string,
): Promise<AuthUser> {

    const result = await this.checkRefreshToken(
        userId,
        refreshToken,
    );

    return result.user;
}

async refresh(
    userId: number,
    refreshToken: string,
    response: Response,
): Promise<{ user: AuthUser }> {

    const { user, storedHash } = await this.checkRefreshToken(
        userId,
        refreshToken,
    );

    return this.issueTokens(
        user,
        response,
        storedHash,
    );
}

async signOut(
    userId: number,
    refreshToken: string,
    response: Response,
): Promise<{ message: string }> {

    const { storedHash } = await this.checkRefreshToken(
        userId,
        refreshToken,
    );

    // Sign the user out by nullifying the stored refresh token hash.
    const result = await this.prisma.user.updateMany({
        where: {
            user_id: userId,
            refresh_token_hash: storedHash,
        },
        data: {
            refresh_token_hash: null,
        },
    });

    if (result.count !== 1) {
        throw new UnauthorizedException(
            'Session is no longer valid',
        );
    }

    this.clearAuthCookies(response);

    return {
        message: 'Successfully signed out',
    };
}
}