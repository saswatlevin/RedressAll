import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import type { AuthUser } from '../types/auth-user.type';

// Local strategy to validate the user.
@Injectable()
export class LocalStrategy extends PassportStrategy(
    Strategy,
    'local',
) {
    constructor(
        // Injects AuthService
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: 'user_email',
            passwordField: 'user_password',
        });
    }

    // validate() calls validateUser() from the AuthService
    async validate(
        email: string,
        password: string,
    ): Promise<AuthUser> {
        return this.authService.validateUser(
            email,
            password,
        );
    }
}