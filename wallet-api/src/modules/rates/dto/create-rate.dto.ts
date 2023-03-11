import { IsNumber, IsString } from 'class-validator';

export class CreateRateDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly code: string;

  @IsString()
  readonly symbol: string;

  @IsNumber()
  readonly rate: number;
}
