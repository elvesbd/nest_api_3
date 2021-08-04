import {
  ArgumentsHost,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: ['Recurso não encontrado'],
        message: exception.message,
      },
    });
  }
}
