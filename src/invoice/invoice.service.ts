import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UploadInvoiceDto } from 'src/dto/uploadInvoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('KAFKA-SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('getAllInvoices');
    this.kafkaClient.subscribeToResponseOf('getInvoice');
    await this.kafkaClient.connect();
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
}
