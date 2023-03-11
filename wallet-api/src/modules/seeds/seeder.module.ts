import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { rateProviders } from '../rates/rate.provider';
import { SeederService } from './seeder.service';

@Module({
  imports: [DatabaseModule],
  providers: [...rateProviders, SeederService],
})
export class SeederModule {}
