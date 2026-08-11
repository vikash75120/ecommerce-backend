import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'myapp',
  synchronize: false, // dev only — auto-creates/updates tables from entities
  logging: false,
  entities: [__dirname + "/entities/**/*{.ts}"],
  migrations: [],
  subscribers: [],
});