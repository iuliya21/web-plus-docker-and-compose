import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { HashProvider } from '../utils/hashProvider';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,

  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '5d',
      }),
    };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findUserByName(username);
    const isPasswordMatch = await HashProvider.validateHash(
      password,
      user.password,
    );
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }
}
