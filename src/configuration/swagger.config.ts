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
    // ...(process.env?.ENVIRONMENT === 'dev'
    //   ? {
    //       customCssUrl:
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui.min.css',
    //       customJs: [
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui.min.js',
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-bundle.min.js',
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-standalone-preset.min.js',
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-es-bundle-core.min.js',
    //         'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-es-bundle.min.js',
    //       ],
    //     }
    //   : {}),
  });

  logger.log('Swagger config applied');
}
