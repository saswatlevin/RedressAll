import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import type { Request } from 'express';

import { AuthService } from '../auth.service';
import type { AuthUser } from '../types/auth-user.type';

import { REFRESH_COOKIE_NAME } from '../auth.constants';

interface RefreshJwtPayload {
    sub: number;
    typ: 'refresh';
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        // ConfigService and AuthService are injected into JwtRefreshStrategy.
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) =>
                    request?.cookies?.[REFRESH_COOKIE_NAME] ?? null,
            ]),

            ignoreExpiration: false,

            secretOrKey: configService.getOrThrow<string>(
                'JWT_REFRESH_TOKEN_SECRET',
            ),

            algorithms: ['HS256'],

            passReqToCallback: true,
        });
    }

    // Checks whether the refresh token is valid or not.
    async validate(
        request: Request,
        payload: RefreshJwtPayload,
    ): Promise<AuthUser> {

        if (
            payload.typ !== 'refresh' ||
            !Number.isSafeInteger(payload.sub) ||
            payload.sub <= 0
        ) {
            throw new UnauthorizedException(
                'Invalid refresh token',
            );
        }

        const refreshToken =
            request.cookies?.[REFRESH_COOKIE_NAME];

        return this.authService.verifyUserRefreshToken(
            payload.sub,
            refreshToken,
        );
    }
}