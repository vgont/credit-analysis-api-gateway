import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateAnalysisDto } from './dto/createAnalysis.dto';
import { firstValueFrom } from 'rxjs';
import { ICreditAnalysis } from './app.interfaces';
import { RegisterClientDto } from './dto/registerClient.dto';
import { UploadInvoiceDto } from './dto/uploadInvoice.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA-SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('getAllCreditAnalysis');
    this.kafkaClient.subscribeToResponseOf('getInvoice');
    this.kafkaClient.subscribeToResponseOf('getAllInvoices');
    await this.kafkaClient.connect();
  }

  registerClient(registerClientDto: RegisterClientDto) {
    this.kafkaClient.emit('registerClient', registerClientDto);
  }

  createCreditAnalysis(createAnalysisDto: CreateAnalysisDto) {
    this.kafkaClient.emit('createCreditAnalysis', { createAnalysisDto });
  }

  async getAllCreditAnalysis(clientEmail: string): Promise<ICreditAnalysis[]> {
    try {
      return firstValueFrom(
        this.kafkaClient.send('getAllCreditAnalysis', clientEmail),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  uploadInvoice(invoice: UploadInvoiceDto, clientEmail: string) {
    this.kafkaClient.emit('uploadInvoice', { invoice, clientEmail });
  }

  async getInvoice(invoiceNumber: string, clientEmail: string): Promise<any> {
    return firstValueFrom(
      this.kafkaClient.send('getInvoice', { invoiceNumber, clientEmail }),
    );
  }

  async getAllInvoices(clientEmail: string): Promise<any> {
    return firstValueFrom(this.kafkaClient.send('getAllInvoices', clientEmail));
  }

  healthCheck(): { status: string } {
    return { status: 'alive' };
  }
}
