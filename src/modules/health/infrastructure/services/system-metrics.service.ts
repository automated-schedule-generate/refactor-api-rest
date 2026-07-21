import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import * as os from 'node:os';
import { Counter, Gauge } from 'prom-client';
import { CpuIndicator } from '../indicators/cpu.indicator';
import { DatabaseIndicator } from '../indicators/database.indicator';
import { MemoryIndicator } from '../indicators/memory.indicator';
import {
  CPU_UNHEALTHY_THRESHOLD_PERCENT,
  DISK_CHECK_PATH,
  DISK_UNHEALTHY_THRESHOLD_PERCENT,
  MEMORY_UNHEALTHY_THRESHOLD_PERCENT,
} from '../constants/health-thresholds.constant';

@Injectable()
export class SystemMetricsService implements OnModuleInit, OnModuleDestroy {
  private interval: NodeJS.Timeout;

  constructor(
    @InjectMetric('system_cpu_usage_percent')
    private readonly cpuUsageGauge: Gauge<string>,
    @InjectMetric('system_cpu_cores')
    private readonly cpuCoresGauge: Gauge<string>,
    @InjectMetric('system_load_average_1m')
    private readonly loadAvg1Gauge: Gauge<string>,
    @InjectMetric('system_load_average_5m')
    private readonly loadAvg5Gauge: Gauge<string>,
    @InjectMetric('system_load_average_15m')
    private readonly loadAvg15Gauge: Gauge<string>,
    @InjectMetric('system_memory_total_bytes')
    private readonly memTotalGauge: Gauge<string>,
    @InjectMetric('system_memory_used_bytes')
    private readonly memUsedGauge: Gauge<string>,
    @InjectMetric('system_memory_free_bytes')
    private readonly memFreeGauge: Gauge<string>,
    @InjectMetric('process_memory_rss_bytes')
    private readonly rssGauge: Gauge<string>,
    @InjectMetric('process_memory_heap_used_bytes')
    private readonly heapUsedGauge: Gauge<string>,
    @InjectMetric('process_memory_heap_total_bytes')
    private readonly heapTotalGauge: Gauge<string>,
    @InjectMetric('process_memory_external_bytes')
    private readonly externalGauge: Gauge<string>,
    @InjectMetric('process_uptime_seconds')
    private readonly uptimeGauge: Gauge<string>,

    // gauges de health check
    @InjectMetric('health_check_status')
    private readonly healthStatusGauge: Gauge<string>,
    @InjectMetric('health_check_total')
    private readonly healthCheckCounter: Counter<string>,

    // indicators e health service
    private readonly healthService: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly cpu: CpuIndicator,
    private readonly memory: MemoryIndicator,
    private readonly db: DatabaseIndicator,
  ) {}

  onModuleInit() {
    void this.collect();
    this.interval = setInterval(() => void this.collect(), 15_000);
  }

  onModuleDestroy() {
    clearInterval(this.interval);
  }

  private async collect() {
    this.updateMemory();
    this.updateProcess();
    await this.updateCpu();
    await this.runHealthChecks().catch(() => {
      // já registrado nas métricas dentro de runHealthChecks; aqui só
      // evita que o timer de coleta seja derrubado por um check falho.
    });
  }

  /**
   * Fonte única de verdade para os health checks: usada tanto pelo timer
   * de coleta em background quanto pelo HealthController (sob demanda).
   * Mantém o comportamento do Terminus - resolve com o resultado em caso
   * de sucesso, rejeita com ServiceUnavailableException (503) em caso de
   * falha - para que o controller possa deixar a exceção propagar.
   */
  async runHealthChecks(): Promise<HealthCheckResult> {
    try {
      const result = await this.healthService.check([
        () => this.db.isHealthy('database'),
        () =>
          this.disk.checkStorage('disk', {
            path: DISK_CHECK_PATH,
            thresholdPercent: DISK_UNHEALTHY_THRESHOLD_PERCENT,
          }),
        () => this.cpu.isHealthy('cpu', CPU_UNHEALTHY_THRESHOLD_PERCENT),
        () =>
          this.memory.isHealthy('memory', MEMORY_UNHEALTHY_THRESHOLD_PERCENT),
      ]);

      this.recordHealthCheckMetrics(result.info);
      return result;
    } catch (err) {
      if (err instanceof ServiceUnavailableException) {
        const response = err.getResponse() as HealthCheckResult;
        this.recordHealthCheckMetrics(response.info, response.error);
      }
      throw err;
    }
  }

  private recordHealthCheckMetrics(
    info: Record<string, unknown> = {},
    error: Record<string, unknown> = {},
  ) {
    for (const checkName of Object.keys(info)) {
      this.healthStatusGauge.set({ check: checkName }, 1);
      this.healthCheckCounter.inc({ check: checkName, status: 'success' });
    }

    for (const checkName of Object.keys(error)) {
      this.healthStatusGauge.set({ check: checkName }, 0);
      this.healthCheckCounter.inc({ check: checkName, status: 'failure' });
    }
  }

  private updateMemory() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    this.memTotalGauge.set(total);
    this.memUsedGauge.set(used);
    this.memFreeGauge.set(free);

    const [avg1, avg5, avg15] = os.loadavg();
    this.loadAvg1Gauge.set(avg1);
    this.loadAvg5Gauge.set(avg5);
    this.loadAvg15Gauge.set(avg15);

    this.cpuCoresGauge.set(os.cpus().length);
  }

  private updateProcess() {
    const mem = process.memoryUsage();
    this.rssGauge.set(mem.rss);
    this.heapUsedGauge.set(mem.heapUsed);
    this.heapTotalGauge.set(mem.heapTotal);
    this.externalGauge.set(mem.external);
    this.uptimeGauge.set(Math.floor(process.uptime()));
  }

  private updateCpu(): Promise<void> {
    return new Promise((resolve) => {
      const start = os.cpus();
      setTimeout(() => {
        const end = os.cpus();
        let idleDiff = 0;
        let totalDiff = 0;

        for (let i = 0; i < start.length; i++) {
          const startTotal = Object.values(start[i].times).reduce(
            (a, b) => a + b,
            0,
          );
          const endTotal = Object.values(end[i].times).reduce(
            (a, b) => a + b,
            0,
          );
          idleDiff += end[i].times.idle - start[i].times.idle;
          totalDiff += endTotal - startTotal;
        }

        const usage = 100 - (idleDiff / totalDiff) * 100;
        this.cpuUsageGauge.set(parseFloat(usage.toFixed(2)));
        resolve();
      }, 100);
    });
  }
}
