import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const logger = new Logger();
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

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  logger.log(
    `Application is running on: 0.0.0.0:${process.env.PORT ?? 3000}/${prefix}`,
  );
}
bootstrap();
