import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SessionAuth } from './session-auth.provider';
import { AuthenticationController } from './authentication.controller';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticationController],
  providers: [SessionAuth,
    CredentialsService
  ]
})
export class AuthenticationModule {}