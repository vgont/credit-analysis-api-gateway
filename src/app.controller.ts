import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateAnalysisDto,
  createAnalysisSchema,
} from './dto/createAnalysis.dto';
import { Response } from 'express';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { getAllCreditAnalysisSchema } from './dto/getAllCreditAnalysis.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(@Res() res: Response): Response {
    return res.send(this.appService.healthCheck());
  }

  @Post('create-credit-analysis')
  @UsePipes(new ZodValidationPipe(createAnalysisSchema))
  createCreditAnalysis(@Body() createAnalysisDto: CreateAnalysisDto) {
    console.log(createAnalysisDto);
    this.appService.createCreditAnalysis(createAnalysisDto);
  }

  @Get('get-analysis/:clientEmail')
  @UsePipes(new ZodValidationPipe(getAllCreditAnalysisSchema))
  async getAllCreditAnalysis(
    @Res() res: Response,
    @Param('clientEmail') clientEmail: string,
  ) {
    try {
      const registries =
        await this.appService.getAllCreditAnalysis(clientEmail);

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
