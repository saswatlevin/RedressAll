import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { REFRESH_COOKIE_NAME } from './auth.constants';
import type { AuthUser } from './types/auth-user.type';

@Controller('auth')
export class AuthController {
    constructor(
        // Injects AuthService into the AuthController.
        private readonly authService: AuthService,
    ) {}

    // Logs the user in. Authenticate credentials and issue tokens
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(
        @CurrentUser() user: AuthUser,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.login(user, response);
    }

    // Issues a refresh token to the user. Rotate refresh token and issue new tokens
    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    @HttpCode(HttpStatus.OK)
    async refresh(
        @CurrentUser() user: AuthUser,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.refresh(
            user.user_id,
            request.cookies[REFRESH_COOKIE_NAME],
            response,
        );
    }

    // Signs the user out. Revoke refresh token and clear cookies
    @Post('signout')
    @UseGuards(JwtRefreshAuthGuard)
    @HttpCode(HttpStatus.OK)
    async signOut(
        @CurrentUser() user: AuthUser,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.signOut(
            user.user_id,
            request.cookies[REFRESH_COOKIE_NAME],
            response,
        );
    }

    // Provides the current user that's logged in (Authenticated). Used by the Frontend to determine if the user is still logged in.
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getCurrentUser(
        @CurrentUser() user: AuthUser,
    ): AuthUser {
        return user;
    }
}