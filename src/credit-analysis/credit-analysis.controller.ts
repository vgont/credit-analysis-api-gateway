import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReqUser } from 'src/app.interfaces';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import {
  CreateAnalysisDto,
  createAnalysisSchema,
} from 'src/dto/createAnalysis.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreditAnalysisService } from './credit-analysis.service';
import { Response } from 'express';

@Controller('credit-analysis')
export class CreditAnalysisController {
  constructor(private readonly creditAnalysisService: CreditAnalysisService) {}
  @Post('/credit-analysis')
  @UsePipes(new ZodValidationPipe(createAnalysisSchema))
  @UseGuards(JwtGuard)
  createCreditAnalysis(
    @Request() req: ReqUser,
    @Body() createAnalysisDto: CreateAnalysisDto,
  ) {
    this.creditAnalysisService.createCreditAnalysis({
      ...createAnalysisDto,
      clientEmail: req.user.username,
    });
  }

  @Get('credit-analysis')
  @UseGuards(JwtGuard)
  async getAllCreditAnalysis(
    @Request() req: ReqUser,
    @Res() res: Response,
  ) {
    try {
      const clientEmail = req.user.username;
      const registries =
        await this.creditAnalysisService.getAllCreditAnalysis(clientEmail);

      if (registries.length === 0) {
        return res.status(404).send({ message: 'No credit analysis found' });
      }

      return res.send(registries);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  }
}
