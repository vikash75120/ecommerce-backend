// entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  stock_qty!: number;

  @Column()
  brand!: string;

  @Column()
  status!: string;
}