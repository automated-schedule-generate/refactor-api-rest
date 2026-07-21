import { Public } from '@commons/metadata/public.metadata';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import * as os from 'node:os';
import * as process from 'node:process';
import { SystemMetricsService } from '../../infrastructure/services/system-metrics.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly systemMetrics: SystemMetricsService) {}

  @ApiOperation({ summary: 'Run health checks (database, disk, CPU, memory)' })
  @Public()
  @Get()
  @HealthCheck()
  async check() {
    const { status, info, error } = await this.systemMetrics.runHealthChecks();
    return { status, info, error };
  }

  @ApiOperation({ summary: 'Get detailed process and OS info' })
  @Public()
  @Get('details')
  details() {
    const uptimeSeconds = process.uptime();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? 'development',
      version: process.env.npm_package_version ?? '0.0.0',
      process: {
        pid: process.pid,
        uptime: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m`,
        uptimeSeconds: Math.floor(uptimeSeconds),
        nodeVersion: process.version,
        memoryUsage: {
          rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)} MB`,
          heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB`,
          heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1)} MB`,
          external: `${(process.memoryUsage().external / 1024 / 1024).toFixed(1)} MB`,
        },
      },
      os: {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        totalMemory: `${(totalMem / 1024 / 1024).toFixed(0)} MB`,
        freeMemory: `${(freeMem / 1024 / 1024).toFixed(0)} MB`,
        usedMemory: `${(usedMem / 1024 / 1024).toFixed(0)} MB`,
        cpuCores: os.cpus().length,
        loadAverage: os.loadavg().map((v) => v.toFixed(2)),
      },
    };
  }
}
