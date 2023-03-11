import { Transaction } from './transaction.entity';

export class Transactions {
  status: string;
  message: string;
  result: Transaction[];
}
