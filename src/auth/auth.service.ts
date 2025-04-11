import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';
import { env } from 'src/env';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<Client, 'password'> | null> {
    const user = await this.clientService.findOne(email);
    if (
      user &&
      (await argon2.verify(user.password, pass, {
        secret: Buffer.from(env.ARGON2_SECRET),
      }))
    ) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  login(user: { email: string }) {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
