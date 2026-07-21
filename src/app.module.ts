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
  PreferenceModule,
  PreferenceTimeModule,
  SemesterModule,
  ClassModule,
  PermissionModule,
  RoleModule,
  UserRoleOrganizationModule,
  OrganizationModule,
  HealthModule,
} from '@modules';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './commons/interceptors/response-format.interceptor';
import { PaginationMiddleware } from './commons/middlewares/pagination.middleware';
import { ResponseErrorFormatInterceptor } from './commons/interceptors/response-error-format.interceptor';
import { RedisModule } from '@database/redis/redis.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from '@controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
      controller: MetricsController,
    }),
    RedisModule,
    HealthModule,
    UserModule,
    AuthModule,
    TeacherModule,
    CoordinatorModule,
    CourseModule,
    SubjectModule,
    PreferenceModule,
    PreferenceTimeModule,
    SemesterModule,
    ClassModule,
    PermissionModule,
    RoleModule,
    UserRoleOrganizationModule,
    OrganizationModule,
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
