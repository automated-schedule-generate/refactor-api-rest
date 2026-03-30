import { Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export function SetPrefixConfig(app: NestFastifyApplication, logger: Logger) {
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

  logger.log(`Prefix set to: ${prefix}`);

  return prefix;
}
