import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Error as SequelizeError } from 'sequelize';
import { DomainException } from '../exceptions/domain-exception';
import { handleSequelizeError } from '../utils/handle-sequelize-error.util';

@Catch()
export class ResponseErrorFormatInterceptor implements ExceptionFilter {
  private readonly logger = new Logger(ResponseErrorFormatInterceptor.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (exception instanceof DomainException) {
      return response.status(400).json({
        message: exception.message,
        code: exception.code,
      });
    }

    if (exception instanceof SequelizeError) {
      try {
        handleSequelizeError(exception);
      } catch (domainException) {
        if (domainException instanceof DomainException) {
          return response.status(400).json({
            message: domainException.message,
            code: domainException.code,
          });
        }
      }
    }

    const internalError = new InternalServerErrorException();
    return response
      .status(internalError.getStatus())
      .json(internalError.getResponse());
  }
}
