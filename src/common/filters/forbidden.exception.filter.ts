import {
  ArgumentsHost,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(403).json({
      message: {
        statusCode: 403,
        error:
          'O usuário informado não possui permissão para realizar esta requisição.',
        message: exception.message,
      },
    });
  }
}
