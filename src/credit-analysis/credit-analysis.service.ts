import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ICreditAnalysis } from 'src/app.interfaces';
import { CreateAnalysisDto } from 'src/dto/createAnalysis.dto';

@Injectable()
export class CreditAnalysisService {
  constructor(
    @Inject('KAFKA-SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('getAllCreditAnalysis');
    await this.kafkaClient.connect();
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
}
