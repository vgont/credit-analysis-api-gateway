import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { status: string } {
    return { status: 'alive' };
  }
}
