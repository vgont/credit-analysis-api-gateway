import { Module } from '@nestjs/common';
import { CreditAnalysisService } from './credit-analysis.service';
import { CreditAnalysisController } from './credit-analysis.controller';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [CreditAnalysisService],
  controllers: [CreditAnalysisController]
})
export class CreditAnalysisModule {}
