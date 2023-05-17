import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { GlobalHTTPFilter } from '../libs/exception-filters/app.filter';
import { exceptionFactory } from '../libs/exception-filters/exceptionFactory.function';

export const createApp = (app: INestApplication): INestApplication => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, exceptionFactory: exceptionFactory }),
  );
  app.useGlobalFilters(new GlobalHTTPFilter());
  return app;
};
