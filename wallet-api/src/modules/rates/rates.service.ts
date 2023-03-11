import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRateDTO, UpdateRateDTO } from './dto';
import { Rate } from './rate.entity';

@Injectable()
export class RatesService {
  constructor(
    @Inject('RATE_REPOSITORY')
    private rateRepository: Repository<Rate>,
  ) {}

  async getRates(): Promise<Rate[]> {
    return await this.rateRepository.find();
  }

  async getRate(id: number): Promise<Rate> {
    const _rate = await this.rateRepository.findOneBy({ id });

    if (!_rate) throw new NotFoundException();
    return _rate;
  }

  async createRate(rate: CreateRateDTO): Promise<Rate> {
    const _rate = await this.rateRepository.create(rate);

    return await this.rateRepository.save(_rate);
  }

  async deleteRate(id: number): Promise<Rate> {
    const _rate = await this.getRate(id);

    return await this.rateRepository.remove(_rate);
  }

  async updateRate(id: number, rate: UpdateRateDTO): Promise<Rate> {
    const _rate = await this.getRate(id);
    Object.keys(rate).forEach((k) => (_rate[k] = rate[k]));

    return await this.rateRepository.save(_rate);
  }
}
