import { HealthIndicatorResult } from '@nestjs/terminus';

export interface IIndicator {
  isHealthy(
    key: string,
    thresholdPercent?: number,
  ): Promise<HealthIndicatorResult> | HealthIndicatorResult;
}
