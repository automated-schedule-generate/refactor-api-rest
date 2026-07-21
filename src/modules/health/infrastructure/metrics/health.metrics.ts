import {
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';

export const healthMetricProviders = [
  // ── health check ──────────────────────────────────────
  makeCounterProvider({
    name: 'health_check_total',
    help: 'Total de health checks executados',
    labelNames: ['check', 'status'],
  }),

  // ── CPU ───────────────────────────────────────────────
  makeGaugeProvider({
    name: 'system_cpu_usage_percent',
    help: 'Uso de CPU em percentual',
  }),
  makeGaugeProvider({
    name: 'system_cpu_cores',
    help: 'Número de cores da CPU',
  }),
  makeGaugeProvider({
    name: 'system_load_average_1m',
    help: 'Load average último 1 minuto',
  }),
  makeGaugeProvider({
    name: 'system_load_average_5m',
    help: 'Load average últimos 5 minutos',
  }),
  makeGaugeProvider({
    name: 'system_load_average_15m',
    help: 'Load average últimos 15 minutos',
  }),

  // ── Memória OS ────────────────────────────────────────
  makeGaugeProvider({
    name: 'system_memory_total_bytes',
    help: 'Memória RAM total em bytes',
  }),
  makeGaugeProvider({
    name: 'system_memory_used_bytes',
    help: 'Memória RAM utilizada em bytes',
  }),
  makeGaugeProvider({
    name: 'system_memory_free_bytes',
    help: 'Memória RAM livre em bytes',
  }),

  // ── Memória processo Node ──────────────────────────────
  makeGaugeProvider({
    name: 'process_memory_rss_bytes',
    help: 'RSS do processo em bytes',
  }),
  makeGaugeProvider({
    name: 'process_memory_heap_used_bytes',
    help: 'Heap usado pelo processo em bytes',
  }),
  makeGaugeProvider({
    name: 'process_memory_heap_total_bytes',
    help: 'Heap total do processo em bytes',
  }),
  makeGaugeProvider({
    name: 'process_memory_external_bytes',
    help: 'Memória externa do processo em bytes',
  }),

  // ── Processo ──────────────────────────────────────────
  makeGaugeProvider({
    name: 'process_uptime_seconds',
    help: 'Uptime do processo em segundos',
  }),

  // ── Health checks individuais ─────────────────────────
  makeGaugeProvider({
    name: 'health_check_status',
    help: 'Status de cada health check (1 = up, 0 = down)',
    labelNames: ['check'],
  }),
];
