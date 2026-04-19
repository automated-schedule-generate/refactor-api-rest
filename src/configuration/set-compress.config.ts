import { Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as zlib from 'node:zlib';

export async function SetCompressConfig(
  app: NestFastifyApplication,
  logger: Logger,
) {
  if (process.env.NGINX_STARTED !== 'true') {
    await app.register(import('@fastify/compress') as any, {
      global: true,
      encodings: ['gzip', 'br'],
      // valor minimo para compressão em bytes
      threshold: 2048,
      brotliOptions: {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 2 },
      },
      zlibOptions: {
        level: 1,
        memLevel: 6,
        chunkSize: 64 * 1024,
      },
      ignoredRoutes: ['/docs', '/docs/*', '/docs/json', '/docs/yaml'],
    });
    logger.log('Compress config applied');
  }
}
