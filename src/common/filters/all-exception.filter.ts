import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ERROR } from '../constants/error';

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error | HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const now = Date.now();
    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : null;

    Logger.error(
      `Api ${request.method} ${request.url} - ${Date.now() - now}ms`,
    );

    if (httpStatus === 401) {
      return response.status(HttpStatus.UNAUTHORIZED).send({
        status: 'error',
        code: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
        message: ERROR.NON_AUTHORITATIVE_INFORMATION,
      });
    }

    if (httpStatus === 403) {
      return response.status(HttpStatus.FORBIDDEN).send({
        status: 'error',
        code: HttpStatus.FORBIDDEN,
        message: ERROR.FORBIDDEN,
      });
    }
  }
}
