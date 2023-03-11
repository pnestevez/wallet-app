import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Wallet } from './wallet.entity';
import { Transactions } from './transactions.entity';

@Injectable()
export class WalletsService {
  private readonly logger = new Logger(WalletsService.name);
  constructor(private httpService: HttpService) {}

  async getWallet(
    id: string,
  ): Promise<{ address: string; balance: number; is_older: boolean }> {
    const { data: _wallet } = await firstValueFrom(
      this.httpService
        .get<Wallet>(
          `${process.env.ETHERSCAN_API_URL}?module=account&action=balance&address=${id}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    if (_wallet.status !== '1' || _wallet.result === '0')
      throw new NotFoundException();

    const { data: _transactions } = await firstValueFrom(
      this.httpService
        .get<Transactions>(
          `${process.env.ETHERSCAN_API_URL}?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return {
      address: id,
      balance: Number(_wallet.result) / 1000000000000000000,
      is_older:
        Number(_transactions.result[0].timeStamp) <
        Date.now() - 365 * 24 * 60 * 60 * 1000,
    };
  }
}
