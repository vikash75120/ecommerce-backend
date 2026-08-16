///<reference path="./types/express.d.ts" />
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';
import productRouter from './routes/product.route';
import { AppDataSource } from './data-source';
import { createUser, loginUser } from './controllers/user.controller';
import { authCheck } from './middlewares/authCheck';
import helmet from 'helmet';
import cors from 'cors';
import { loginLimiter } from './middlewares/loginLimiter';

dotenv.config();

if (!process.env.TOKEN_SECRET) {
  throw new Error('TOKEN_SECRET is not set in environment variables');
}

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:8000'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', createUser);
app.post('/login', loginLimiter, loginUser);

app.use('/users', authCheck, userRouter);
app.use('/products', productRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log('Server running on port 8000'));
  })
  .catch((err) => console.error('Error during Data Source initialization:', err));
