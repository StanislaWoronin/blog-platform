import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    if (status === 400) {
      const errors = {
        errorsMessages: [],
      };
      const responseBody: any = exception.getResponse();
      responseBody.message.forEach((m) => errors.errorsMessages.push(m));

      return response.status(status).send(errors);
    }

    return response.sendStatus(status);
  }
}
