import { Public } from '@commons/metadata/public.metadata';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';
import { register } from 'prom-client';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  @ApiOperation({ summary: 'Prometheus metrics endpoint' })
  @Public()
  @Get()
  async metrics(@Res() reply: FastifyReply) {
    const metrics = await register.metrics();

    reply.header('Content-Type', register.contentType).send(metrics);
  }
}
