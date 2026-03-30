import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import json5 from 'json5';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    return next.handle().pipe(
      map((data: any) => {
        const isJson5 = request.headers['json-type'];
        if (isJson5 === 'json5') {
          return json5.stringify({
            success: true,
            data: data?.data || data,
            statusCode: response.statusCode,
            message: data?.message || 'Operação realizada com sucesso',
          });
        }
        return {
          success: true,
          data: data?.data || data,
          statusCode: response.statusCode,
          message: data?.message || 'Operação realizada com sucesso',
        };
      }),
    );
  }
}
