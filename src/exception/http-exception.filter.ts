import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * handle exception
   * @param {any} exception
   * @param {ArgumentsHost} host
   * @returns {any}
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    console.log('HttpExceptionFilter : ', request.body);
    console.log('HttpExceptionFilter : ', exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      err: {
        code: 500,
        message: 'server Error.',
      },
    });
    return;
  }
}
