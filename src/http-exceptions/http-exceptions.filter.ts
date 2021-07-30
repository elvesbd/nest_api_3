import {
  ArgumentsHost,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

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

export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Recurso não encontrado',
        message: exception.message,
      },
    });
  }
}

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
