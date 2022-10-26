import 'reflect-metadata';
import 'dotenv/config';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import { pagination } from 'typeorm-pagination';

import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';

import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(`${process.env.APP_PORT}`, () => {
  // eslint-disable-next-line no-console
  console.log('🚀🚀🚀 Server started on port 3333!🚀🚀🚀');
});
