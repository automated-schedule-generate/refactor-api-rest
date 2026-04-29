import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import {
  AuthModule,
  CoordinatorModule,
  TeacherModule,
  UserModule,
  CourseModule,
  SubjectModule,
  SemesterModule,
  ClassModule,
} from '@modules';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './commons/interceptors/response-format.interceptor';
import { PaginationMiddleware } from './commons/middlewares/pagination.middleware';
import { ResponseErrorFormatInterceptor } from './commons/interceptors/response-error-format.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    TeacherModule,
    CoordinatorModule,
    CourseModule,
    SubjectModule,
    SemesterModule,
    ClassModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ResponseErrorFormatInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes('*path');
  }
}
