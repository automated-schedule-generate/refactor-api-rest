import { Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function SwaggerConfig(app: NestFastifyApplication, logger: Logger) {
  const config = new DocumentBuilder()
    .setTitle('Asgen API')
    .setDescription('API REST do gerador de horario')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
    yamlDocumentUrl: 'docs/yaml',
  });

  logger.log('Swagger config applied');
}
