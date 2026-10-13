import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SessionAuth } from './session-auth.provider';
import { MyAuthenticationController } from './myauthentication.controller';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [UsersModule],
  controllers: [MyAuthenticationController],
  providers: [SessionAuth,
    CredentialsService
  ]
})
export class AuthenticationModule {}