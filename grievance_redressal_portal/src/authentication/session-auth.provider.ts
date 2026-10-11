import { Injectable } from '@nestjs/common';
import { AuthenticationRegistry, SessionCookieProvider, type SessionRecord } from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';

import type { User as PrismaUser } from '../generated/prisma/client.js';
export type User = Omit<PrismaUser, 'user_password'>;

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
  constructor(
    private readonly usersService: UsersService,
    registry: AuthenticationRegistry,
  ) {
    super();
    // Adds this provider to the chain the guard runs for every request.
    registry.registerProvider(this);
  }

  // Called for every request with a live session cookie.
  // Returning null (the user was deleted) ends the session.
  validate(session: SessionRecord) {
    console.log("In validate() in SessionAuth")
    const user_id = session.userId; 
    var numeric_user_id = Number(user_id);
    return this.usersService.findOneUser(numeric_user_id);
  }
}