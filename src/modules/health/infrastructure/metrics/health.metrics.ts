import {
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';

const values = [
  // ── CPU ───────────────────────────────────────────────
  {
    name: 'system_cpu_usage_percent',
    help: 'Uso de CPU em percentual',
  },
  {
    name: 'system_cpu_cores',
    help: 'Número de cores da CPU',
  },
  {
    name: 'system_load_average_1m',
    help: 'Load average último 1 minuto',
  },
  {
    name: 'system_load_average_5m',
    help: 'Load average últimos 5 minutos',
  },
  {
    name: 'system_load_average_15m',
    help: 'Load average últimos 15 minutos',
  },

  // ── Memória OS ────────────────────────────────────────
  {
    name: 'system_memory_total_bytes',
    help: 'Memória RAM total em bytes',
  },
  {
    name: 'system_memory_used_bytes',
    help: 'Memória RAM utilizada em bytes',
  },
  {
    name: 'system_memory_free_bytes',
    help: 'Memória RAM livre em bytes',
  },

  // ── Memória processo Node ──────────────────────────────
  {
    name: 'process_memory_rss_bytes',
    help: 'RSS do processo em bytes',
  },
  {
    name: 'process_memory_heap_used_bytes',
    help: 'Heap usado pelo processo em bytes',
  },
  {
    name: 'process_memory_heap_total_bytes',
    help: 'Heap total do processo em bytes',
  },
  {
    name: 'process_memory_external_bytes',
    help: 'Memória externa do processo em bytes',
  },

  // ── Processo ──────────────────────────────────────────
  {
    name: 'process_uptime_seconds',
    help: 'Uptime do processo em segundos',
  },

  // ── Health checks individuais ─────────────────────────
  {
    name: 'health_check_status',
    help: 'Status de cada health check (1 = up, 0 = down)',
    labelNames: ['check'],
  },
];

export const healthMetricProviders = [
  // ── health check ──────────────────────────────────────
  makeCounterProvider({
    name: 'health_check_total',
    help: 'Total de health checks executados',
    labelNames: ['check', 'status'],
  }),

  ...values.map(({ name, help, labelNames }) =>
    makeGaugeProvider({ name, help, labelNames }),
  ),
];
