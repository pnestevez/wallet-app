import { DataSource } from 'typeorm';
import { Rate } from '../rates/rate.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'password',
        database: 'postgres',
        entities: [Rate],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
