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
import { RawServerDefault } from 'fastify';
import { HttpMethods } from './commons/types/http-methods.type';

async function main() {
  const logger = new Logger('main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
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

  app.enableCors({
    origin: '*',
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Fastify type clash in Docker build
  app.getHttpAdapter().get('/healthz', (_, res) => {
    res.status(200).send('ok');
  });
  logger.log(
    `Application is running on: 0.0.0.0:${process.env.PORT ?? 3000}/${prefix}`,
  );
  await app.init();
  return app;
}

let app: NestFastifyApplication<RawServerDefault>;

main()
  .then((x) => (app = x))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export default {
  fetch: async (req: Request) => {
    const fastify = app.getHttpAdapter().getInstance();

    // Converte Request (Web API) → Fastify inject
    const url = new URL(req.url);
    const body = req.body ? await req.text() : undefined;

    const response = await fastify.inject({
      method: req.method as HttpMethods,
      url: url.pathname + url.search,
      headers: Object.fromEntries(req.headers.entries()),
      payload: body,
    });

    // Status codes 204, 205 and 304 cannot have a body (Fetch spec / Deno enforcement)
    const responseBody: BodyInit | null = [101, 204, 205, 304].includes(
      response.statusCode,
    )
      ? null
      : (response.rawPayload as BodyInit);

    return new Response(responseBody, {
      status: response.statusCode,
      headers: response.headers as HeadersInit,
    });
  },
} satisfies Deno.ServeDefaultExport;
