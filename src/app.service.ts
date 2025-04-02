import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateAnalysisDto } from './dto/createAnalysis.dto';
import { firstValueFrom } from 'rxjs';
import { ICreditAnalysis } from './app.interfaces';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA-SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('getAllCreditAnalysis');
    await this.kafkaClient.connect();
  }

  createCreditAnalysis(createAnalysisDto: CreateAnalysisDto) {
    this.kafkaClient.emit('createCreditAnalysis', createAnalysisDto);
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

  healthCheck(): { status: string } {
    return { status: 'alive' };
  }
}
