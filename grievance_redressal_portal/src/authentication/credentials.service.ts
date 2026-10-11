import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { FindUserByEmailDto } from '../users/dto/find-user-by-email.dto.js';
import * as argon2 from 'argon2';
import { USER_STATUS } from '../users/user.constants.js';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async register(createUserDto: CreateUserDto) {

    const findUserByEmailDto: FindUserByEmailDto = {
      user_email: createUserDto.user_email
    }

    // Don't create the user if the email already exists.
    if (await this.usersService.findUserByEmail(findUserByEmailDto)) {
      throw new ConflictException('Email already registered. User already exists.');
    }
    // The address is unverified: anyone can type any email into a sign-up form.
    const registered_user = await this.usersService.createUser(createUserDto);
    return registered_user;
  }

  /** The user, or `null` when the email or the password is wrong. */
  async verify(email: string, password: string) {
    
    const findUserByEmailDto: FindUserByEmailDto = {
      user_email: email
    }

    const found_user = await this.usersService.findUserByEmail(findUserByEmailDto);
    
    // Checking if the user exists.
    if (!found_user) {
      return null;
    }
    
    // If the user is suspended, reject login by throwing an exception.
    if (found_user.user_status === USER_STATUS.SUSPENDED) {
       throw new ConflictException('User is suspended. Login rejected. Please contact admin.');
    }

    // If the found_user's password is wrong, (password_hash doesn't match) then the it should return null.
    const password_hash: string | null | undefined = found_user?.user_password;
    
    const password_check = await argon2.verify(password_hash as string, password);

    // Checking if the user's password is correct.
    if (password_check !== true) {
      return null;
    }

   
    return found_user;
  }
}