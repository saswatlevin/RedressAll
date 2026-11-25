import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import type { Request } from 'express';
import type { AuthUser } from '../types/auth-user.type';

import { AuthService } from '../auth.service';
import { ACCESS_COOKIE_NAME } from '../auth.constants';

interface AccessJwtPayload {
    sub: number;
    typ: 'access';
    iat?: number;
    exp?: number;
}

// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
    constructor(
        // Injects the ConfigService and the AuthService classes.
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            // Get the JWT from the request body.
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) =>
                    request?.cookies?.[ACCESS_COOKIE_NAME] ?? null,
            ]),

            // DO NOT ignore expired JWT tokens.
            ignoreExpiration: false,

            // ??
            secretOrKey: configService.getOrThrow<string>(
                'JWT_ACCESS_TOKEN_SECRET',
            ),

            algorithms: ['HS256'],
        });
    }

    // validate() checks the JWT payload type and user ID.
    async validate(
        payload: AccessJwtPayload,
    ): Promise<AuthUser> {

        // ??
        if (
            payload.typ !== 'access' ||
            !Number.isSafeInteger(payload.sub) ||
            payload.sub <= 0
        ) {
            throw new UnauthorizedException(
                'Invalid access token',
            );
        }

        return this.authService.getActiveUser(
            payload.sub,
        );
    }
}

/**
 *  1. Passport extracts the JWT from the Authentication cookie.
    2. passport-jwt verifies the token signature and expiration.
    3. validate() checks the JWT payload type and user ID.
    4. The application queries PostgreSQL to confirm the user still exists and is active.
    5. Passport attaches the resulting AuthUser to request.user.
 */