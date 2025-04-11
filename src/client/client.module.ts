import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { clientProviders } from './client.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ClientService, ...clientProviders],
  exports: [ClientService],
})
export class ClientModule {}
