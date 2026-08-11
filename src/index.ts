import "reflect-metadata"
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import user from "./routes/user.route";
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', user);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Error during Data Source initialization:', err));
