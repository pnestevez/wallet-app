import { DataSource } from 'typeorm';
import { Rate } from './rate.entity';

export const rateProviders = [
  {
    provide: 'RATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rate),
    inject: ['DATA_SOURCE'],
  },
];
