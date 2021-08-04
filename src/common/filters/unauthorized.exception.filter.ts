import {
  ArgumentsHost,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(401).json({
      statusCode: 401,
      message: {
        error: 'O usuário informado não está autenticado na aplicação.',
        message: exception.message,
      },
    });
  }
}
