import { IIndicator } from '@interfaces';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import * as os from 'node:os';

@Injectable()
export class MemoryIndicator extends HealthIndicator implements IIndicator {
  isHealthy(key: string, thresholdPercent = 90): HealthIndicatorResult {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usagePercent = (usedMem / totalMem) * 100;

    const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

    const isHealthy = usagePercent < thresholdPercent;

    const result = this.getStatus(key, isHealthy, {
      usagePercent: `${usagePercent.toFixed(2)}%`,
      used: `${toMB(usedMem)} MB`,
      free: `${toMB(freeMem)} MB`,
      total: `${toMB(totalMem)} MB`,
      threshold: `${thresholdPercent}%`,
    });

    if (!isHealthy) throw new HealthCheckError('Memory usage too high', result);
    return result;
  }
}
