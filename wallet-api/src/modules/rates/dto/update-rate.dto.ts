import { PickType } from '@nestjs/mapped-types';
import { CreateRateDTO } from './create-rate.dto';

export class UpdateRateDTO extends PickType(CreateRateDTO, ['rate'] as const) {}
