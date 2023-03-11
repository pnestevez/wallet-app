import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { rateProviders } from './rate.provider';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RatesController],
  providers: [...rateProviders, RatesService],
})
export class RatesModule {}
