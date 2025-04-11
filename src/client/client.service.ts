import { Inject, Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { RegisterClientDto } from './dto/register-client.dto';
import * as argon2 from 'argon2';
import { env } from 'src/env';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(user: RegisterClientDto): Promise<Client> {
    const hashedPassword = await argon2.hash(user.password, {
      secret: Buffer.from(env.ARGON2_SECRET),
    });
    return await this.clientRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async findOne(email: string): Promise<Client | null> {
    return await this.clientRepository.findOne({ where: { email } });
  }
}
