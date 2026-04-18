import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Error as SequelizeError } from 'sequelize';
import { DomainException } from '../exceptions/domain-exception';
import { handleSequelizeError } from '../utils/handle-sequelize-error.util';

@Catch()
export class ResponseErrorFormatInterceptor implements ExceptionFilter {
  private readonly logger = new Logger(ResponseErrorFormatInterceptor.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .send(exception.getResponse());
    }

    if (exception instanceof DomainException) {
      return response.status(400).send({
        message: exception.message,
        code: exception.code,
      });
    }

    if (exception instanceof SequelizeError) {
      try {
        handleSequelizeError(exception);
      } catch (domainException) {
        if (domainException instanceof DomainException) {
          return response.status(400).send({
            message: domainException.message,
            code: domainException.code,
          });
        }
      }
    }

    const internalError = new InternalServerErrorException();
    return response
      .status(internalError.getStatus())
      .send(internalError.getResponse());
  }
}
