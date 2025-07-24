import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let error = '';

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Registro já existente. Campo duplicado.';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Registro não encontrado.';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = 'Erro de requisição no banco de dados.';
      }

      error = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro de validação dos dados enviados.';
      error = exception.message;
    } else if (exception instanceof PrismaClientInitializationError) {
      message = 'Erro ao inicializar o Prisma.';
      error = exception.message;
    } else {
      error = exception.message;
    }

    const cleanError = error
      ?.trim()
      ?.split('\n')
      ?.filter((line) => line.trim() !== '')
      ?.at(-1);

    response.status(status).json({
      statusCode: status,
      message,
      error: cleanError ?? message,
    });
  }
}
