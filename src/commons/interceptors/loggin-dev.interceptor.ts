import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogginDevInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogginDevInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body, query, params, headers, method, url } = request;

    this.logger.log(`Request:`, {
      method,
      url,
    });
    this.logger.log(`Body:`, body);
    this.logger.log(`Query:`, query);
    this.logger.log(`Params:`, params);
    this.logger.log(`Headers:`, headers);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Request took ${Date.now() - now}ms`);
      }),
    );
  }
}
