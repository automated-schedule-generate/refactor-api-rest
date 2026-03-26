import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerConfig } from './configuration/swagger.config';
import { LogginDevInterceptor } from './commons/interceptors/loggin-dev.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  let prefix = '';

  switch (process.env.ENVIRONMENT?.trim()) {
    case 'dev':
      prefix = 'dev';
      break;
    case 'test':
      prefix = 'test';
      break;
    case 'rc':
      prefix = 'rc';
      break;
    case 'prod':
      prefix = 'prod';
      break;
    default:
      prefix = 'dev';
      break;
  }
  prefix += '/api';

  app.setGlobalPrefix(prefix);

  SwaggerConfig(app);

  if (process.env.LOGGING?.trim() === 'true') {
    app.useGlobalInterceptors(new LogginDevInterceptor());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  const logger = new Logger();
  logger.log(
    `Application is running on: 0.0.0.0:${process.env.PORT ?? 3000}/${prefix}`,
  );
}
bootstrap();
