import { env } from 'src/env';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
