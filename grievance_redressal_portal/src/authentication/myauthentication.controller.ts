import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { Public, SignInService } from '@nestjs/authentication';
import { SignInDto } from './dto/sign-in.dto';
import { CredentialsService } from './credentials.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Public()
@Controller('auth')
export class MyAuthenticationController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly signInService: SignInService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.credentialsService.register(createUserDto);
    var string_user_id = String(user.user_id);
    await this.signInService.signIn(string_user_id, { method: 'password' });
    return user;
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.credentialsService.verify(signInDto.user_email, signInDto.user_password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    var string_user_id = String(user.user_id);

    const { session } = await this.signInService.signIn(string_user_id, { method: 'password' });
    return { mfaRequired: session.mfa === 'pending' };
  }

  @Post('sign-out')
  @HttpCode(204)
  async signOut() {
    if (!(await this.signInService.signOut())) {
      throw new UnauthorizedException();
    }
  }
}