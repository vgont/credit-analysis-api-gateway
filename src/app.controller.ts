import {
  Body,
  Controller,
  Get,
  Headers,
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
import {
  RegisterClientDto,
  registerClientSchema,
} from './dto/registerClient.dto';
import { UploadInvoiceDto, UploadInvoiceSchema } from './dto/uploadInvoice.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(@Res() res: Response): Response {
    return res.send(this.appService.healthCheck());
  }

  @Post('register-client')
  @UsePipes(new ZodValidationPipe(registerClientSchema))
  registerClient(@Body() registerClientDto: RegisterClientDto) {
    this.appService.registerClient(registerClientDto);
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

  @Post('invoice')
  @UsePipes(new ZodValidationPipe(UploadInvoiceSchema))
  uploadInvoice(
    @Body() invoice: UploadInvoiceDto,
    @Headers() headers: { [key: string]: string },
  ) {
    const clientEmail = headers['client-email'];
    try {
      this.appService.uploadInvoice(invoice, clientEmail);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('invoice/:invoiceNumber')
  async getInvoice(
    @Param('invoiceNumber') invoiceNumber: string,
    @Headers() headers: { [key: string]: string },
  ): Promise<any> {
    try {
      const clientEmail = headers['client-email'];
      const invoice = await this.appService.getInvoice(
        invoiceNumber,
        clientEmail,
      );
      return invoice;
    } catch (error) {
      console.log(error);
      return 'No invoice found';
    }
  }

  @Get('invoices')
  async getAllInvoices(
    @Headers() headers: { [key: string]: string },
  ): Promise<any> {
    try {
      const clientEmail = headers['client-email'];
      const invoices = await this.appService.getAllInvoices(clientEmail);
      return invoices;
    } catch (error) {
      console.log(error);
      return 'No invoices found';
    }
  }
}
