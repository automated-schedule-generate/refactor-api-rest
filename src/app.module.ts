import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { AuthModule, UserModule } from '@modules';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './commons/interceptors/response-format.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
