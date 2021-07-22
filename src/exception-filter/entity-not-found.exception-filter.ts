import { ArgumentsHost } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Not Found',
        message: exception.message,
      },
    });
  }
}
