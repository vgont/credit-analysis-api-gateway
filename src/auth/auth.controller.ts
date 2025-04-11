import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LocalGuard } from './local-auth.guard';
import { ReqUser } from 'src/app.interfaces';
import { RegisterClientDto, registerClientSchema } from 'src/client/dto/register-client.dto';
import { ClientService } from 'src/client/client.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerClientSchema))
  async register(@Body() user: RegisterClientDto) {
    await this.clientService.create(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req: ReqUser) {
    return this.authService.login({ email: req.user.username });
  }
}
