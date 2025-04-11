import {
  Body,
  Get,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReqUser } from 'src/app.interfaces';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import {
  UploadInvoiceDto,
  UploadInvoiceSchema,
} from 'src/dto/uploadInvoice.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { InvoiceService } from './invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Post('invoice')
  @UseGuards(JwtGuard)
  @UsePipes(new ZodValidationPipe(UploadInvoiceSchema))
  uploadInvoice(@Request() req: ReqUser, @Body() invoice: UploadInvoiceDto) {
    const { username: clientEmail } = req.user;
    try {
      this.invoiceService.uploadInvoice(invoice, clientEmail);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('invoice/:invoiceNumber')
  @UseGuards(JwtGuard)
  async getInvoice(
    @Request() req: ReqUser,
    @Param('invoiceNumber') invoiceNumber: string,
  ): Promise<any> {
    try {
      const clientEmail = req.user.username;
      const invoice = await this.invoiceService.getInvoice(
        invoiceNumber,
        clientEmail,
      );
      return invoice;
    } catch (error) {
      return 'No invoice found';
    }
  }

  @Get('invoices')
  @UseGuards(JwtGuard)
  async getAllInvoices(@Request() req: ReqUser): Promise<any> {
    try {
      const { username: clientEmail } = req.user;
      const invoices = await this.invoiceService.getAllInvoices(clientEmail);
      return invoices;
    } catch (error) {
      console.log(error);
      return 'No invoices found';
    }
  }
}
