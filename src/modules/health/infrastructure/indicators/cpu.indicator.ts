import { IIndicator } from '@interfaces';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import * as os from 'node:os';
import { Gauge } from 'prom-client';

@Injectable()
export class CpuIndicator extends HealthIndicator implements IIndicator {
  constructor(
    @InjectMetric('system_cpu_usage_percent')
    private readonly cpuGauge: Gauge<string>,
  ) {
    super();
  }

  private getUsage(): Promise<number> {
    return new Promise((resolve) => {
      const start = os.cpus();

      setTimeout(() => {
        const end = os.cpus();
        let idleDiff = 0;
        let totalDiff = 0;

        for (let i = 0; i < start.length; i++) {
          const startTimes = start[i].times;
          const endTimes = end[i].times;

          const startTotal = Object.values(startTimes).reduce(
            (a, b) => a + b,
            0,
          );
          const endTotal = Object.values(endTimes).reduce((a, b) => a + b, 0);

          idleDiff += endTimes.idle - startTimes.idle;
          totalDiff += endTotal - startTotal;
        }

        resolve(100 - (idleDiff / totalDiff) * 100);
      }, 100);
    });
  }

  async isHealthy(key: string, threshold = 90): Promise<HealthIndicatorResult> {
    const usage = await this.getUsage();
    const rounded = Number.parseFloat(usage.toFixed(2));

    this.cpuGauge.set(rounded);

    const isHealthy = rounded < threshold;

    const result = this.getStatus(key, isHealthy, {
      usage: `${rounded}%`,
      threshold: `${threshold}%`,
      cores: os.cpus().length,
      model: os.cpus()[0].model,
    });

    if (!isHealthy) throw new HealthCheckError('CPU usage too high', result);
    return result;
  }
}
