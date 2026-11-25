import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '../prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

// We register the Passport strategies as providers in AuthModule. 
// This is how NestJS discovers and initializes them.
@Module({
    imports: [
        PrismaModule,
        PassportModule.register({
            session: false,
        }),
        JwtModule.register({}),
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
    ],

    exports: [
        AuthService,
    ],
})
export class AuthModule {}