import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CreditAnalysisModule } from './credit-analysis/credit-analysis.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ClientModule,
    InvoiceModule,
    CreditAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
