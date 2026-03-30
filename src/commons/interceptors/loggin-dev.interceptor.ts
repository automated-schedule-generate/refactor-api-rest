import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import json5 from 'json5';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LogginDevInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogginDevInterceptor.name);

  constructor() {
    this.logger.log('LogginDevInterceptor initialized');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { body, query, params, headers, method, url } = request;

    this.logger.log(`Request:`, json5.stringify({ method, url }, null, 2));
    this.logger.log(`Body:`, json5.stringify(body, null, 2));
    this.logger.log(`Query:`, json5.stringify(query, null, 2));
    this.logger.log(`Params:`, json5.stringify(params, null, 2));
    this.logger.log(`Headers:`, json5.stringify(headers, null, 2));

    console.time('request');
    return next.handle().pipe(
      tap((response) => {
        this.logger.log(`Response:`, json5.stringify(response, null, 2));
        console.timeEnd('request');
      }),
    );
  }
}
