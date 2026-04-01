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
      map((data: { data?: any; message?: string }) => {
        const isJson5 = request.headers['json-type'];
        let newData: any = data;
        let message: string = 'Operação realizada com sucesso';

        if (data?.data) {
          newData = data.data;
        }

        if (data?.message && typeof data.message === 'string') {
          message = data.message;
        }
        if (isJson5 === 'json5') {
          return json5.stringify({
            success: true,
            data: newData,
            statusCode: response.statusCode,
            message,
          });
        }
        return {
          success: true,
          data: newData,
          statusCode: response.statusCode,
          message,
        };
      }),
    );
  }
}
