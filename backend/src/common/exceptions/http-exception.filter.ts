import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    let status;
    if ('getStatus' in exception) {
      status = exception.getStatus();
    }
    const response = context.getResponse<Response>();
    const message = exception.message;
    response.status(status || HttpStatus.NOT_FOUND).json({ success: false, error: message });
  }
}
