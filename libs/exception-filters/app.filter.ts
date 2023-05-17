import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException)
export class GlobalHTTPFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const [response, status, errorsMessages] = [
      host.switchToHttp().getResponse<Response>(),
      exception.getStatus(),
      exception.getResponse(),
    ];
    if (status === HttpStatus.BAD_REQUEST) {
      return response.status(status).json(errorsMessages);
    }

    const isProduction = Boolean(process.env.IS_PROD);
    if (isProduction && status === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new Error('Something went wrong.');
    }
    return response.sendStatus(status);
  }
}
