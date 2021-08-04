import {
  ArgumentsHost,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';

export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(422).json({
      message: {
        statusCode: 422,
        error: 'Algum parâmetro informado é inválido ou está em outro padrão.',
        message: exception.message,
      },
    });
  }
}
