import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateRateDTO, UpdateRateDTO } from './dto';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get()
  getRates() {
    return this.ratesService.getRates();
  }

  @Post()
  createRate(@Body() data: CreateRateDTO) {
    return this.ratesService.createRate(data);
  }

  @Delete(':id')
  deleteRate(@Param('id') id: number) {
    return this.ratesService.deleteRate(id);
  }

  @Patch(':id')
  updateRate(@Param('id') id: number, @Body() data: UpdateRateDTO) {
    return this.ratesService.updateRate(id, data);
  }
}
