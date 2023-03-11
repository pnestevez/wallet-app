import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rate } from '../rates/rate.entity';
import { rates } from './data';

@Injectable()
export class SeederService {
  constructor(
    @Inject('RATE_REPOSITORY')
    private rateRepository: Repository<Rate>,
  ) {}

  seed(): Promise<Rate>[] {
    const _rates: Promise<Rate>[] = [];
    rates.forEach(async (rate) => {
      const existingRate = await this.rateRepository.findOneBy({
        code: rate.code,
      });
      if (!existingRate) _rates.push(this.rateRepository.save(rate));
    });

    return _rates;
  }
}
