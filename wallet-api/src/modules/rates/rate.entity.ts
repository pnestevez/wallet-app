import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @Column('float')
  rate: number;
}
