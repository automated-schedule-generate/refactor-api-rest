import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerConfig } from './configuration/swagger.config';
import { LogginDevInterceptor } from './commons/interceptors/loggin-dev.interceptor';
import { SetPrefixConfig } from './configuration/set-prefix.config';
import { SetCompressConfig } from './configuration/set-compress.config';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      http2: process.env?.ENVIRONMENT?.trim() === 'prod' ? undefined : true,
      https:
        process.env.https_enable === 'true'
          ? {
              // allowHTTP1: true,
              key: fs.readFileSync(
                path.join(__dirname, 'commons/certificates/localhost-key.pem'),
              ),
              cert: fs.readFileSync(
                path.join(__dirname, 'commons/certificates/localhost.pem'),
              ),
            }
          : undefined,
      logger: false,
    }),
  );

  if (process.env.LOGGING?.trim() === 'true') {
    app.useGlobalInterceptors(new LogginDevInterceptor());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await SetCompressConfig(app, logger);
  SwaggerConfig(app, logger);
  const prefix = SetPrefixConfig(app, logger);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  logger.log(
    `Application is running on: 0.0.0.0:${process.env.PORT ?? 3000}/${prefix}`,
  );
}
