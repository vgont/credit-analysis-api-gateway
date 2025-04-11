import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    PassportModule,
    ClientModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
