import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
