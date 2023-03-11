import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RatesModule } from './modules/rates/rates.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [RatesModule, WalletsModule, ConfigModule.forRoot()],
})
export class AppModule {}
