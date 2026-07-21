import { HealthController } from '@controllers';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SystemMetricsService } from './infrastructure/services/system-metrics.service';
import { CpuIndicator } from './infrastructure/indicators/cpu.indicator';
import { DatabaseIndicator } from './infrastructure/indicators/database.indicator';
import { MemoryIndicator } from './infrastructure/indicators/memory.indicator';
import { healthMetricProviders } from './infrastructure/metrics/health.metrics';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    CpuIndicator,
    MemoryIndicator,
    DatabaseIndicator,
    SystemMetricsService,
    ...healthMetricProviders,
  ],
})
export class HealthModule {}
