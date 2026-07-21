# Module: health

## Purpose

Exposes health check and Prometheus metrics endpoints for monitoring. Health checks cover database connectivity, disk space, CPU load, and memory usage. Results are pushed to Prometheus gauges/counters.

Both `/health*` and `/metrics` are decorated with `@Public()` (method-level — the app has a global `AuthGuard`, so any route without `@Public()` requires a JWT and would be unreachable by probes/scrapers).

## HTTP routes

### `/health`

| Method | Path              | Description                                                                                              |
| ------ | ----------------- | -------------------------------------------------------------------------------------------------------- |
| GET    | `/health`         | Run all health checks; returns `{ status, info, error }`. Returns HTTP 503 (not 200) if any check fails. |
| GET    | `/health/details` | Process + OS details: uptime, memory, CPU, Node version                                                  |

### `/metrics`

| Method | Path       | Guard     | Description                                                                                                                                                               |
| ------ | ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/metrics` | `@Public` | Prometheus metrics in text format (custom metrics below + prom-client default Node.js metrics, enabled via `defaultMetrics.enabled: true` in `PrometheusModule.register`) |

## Health check execution — single source of truth

`SystemMetricsService.runHealthChecks()` is the **only** place that runs the check battery (db/disk/cpu/memory) and records `health_check_status`/`health_check_total`. It's called from two places:

- The background timer (`SystemMetricsService.collect()`, every 15s) — keeps the metrics fresh even if nothing hits `/health`.
- `HealthController.check()` — reused as-is, so the on-demand HTTP call and the background loop always agree (same thresholds, same code path). On failure it throws Terminus' `ServiceUnavailableException`, which the controller lets propagate so the response is a real 503, and the global `ResponseErrorFormatInterceptor` formats the body.

Thresholds live in `infrastructure/constants/health-thresholds.constant.ts` — change them there, not inline at each call site.

## Health indicators

| Indicator  | Class                                     | What it checks          |
| ---------- | ----------------------------------------- | ----------------------- |
| `database` | `DatabaseIndicator`                       | PostgreSQL connectivity |
| `disk`     | `DiskHealthIndicator` (Terminus built-in) | Disk usage < 80% on `/` |
| `cpu`      | `CpuIndicator`                            | CPU load < 90%          |
| `memory`   | `MemoryIndicator`                         | Memory usage < 85%      |

## Prometheus metrics registered (`infrastructure/metrics/health.metrics.ts`)

| Metric                                                                                    | Type    | Labels          |
| ----------------------------------------------------------------------------------------- | ------- | --------------- |
| `health_check_total`                                                                      | Counter | `check, status` |
| `health_check_status`                                                                     | Gauge   | `check`         |
| `system_cpu_usage_percent`                                                                | Gauge   | —               |
| `system_cpu_cores`                                                                        | Gauge   | —               |
| `system_load_average_1m` / `_5m` / `_15m`                                                 | Gauge   | —               |
| `system_memory_total_bytes` / `_used_bytes` / `_free_bytes`                               | Gauge   | —               |
| `process_memory_rss_bytes` / `_heap_used_bytes` / `_heap_total_bytes` / `_external_bytes` | Gauge   | —               |
| `process_uptime_seconds`                                                                  | Gauge   | —               |

Plus prom-client's default Node.js metrics (`nodejs_*`, `process_cpu_*`, event loop lag, GC).

## Key files

| File                                                     | Role                                                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `infrastructure/constants/health-thresholds.constant.ts` | Single source of truth for unhealthy thresholds                                     |
| `infrastructure/indicators/cpu.indicator.ts`             | Custom `HealthIndicator` for CPU                                                    |
| `infrastructure/indicators/database.indicator.ts`        | Custom `HealthIndicator` for DB                                                     |
| `infrastructure/indicators/memory.indicator.ts`          | Custom `HealthIndicator` for memory                                                 |
| `infrastructure/services/system-metrics.service.ts`      | Background metrics collector + `runHealthChecks()` (shared by controller and timer) |
| `presentation/controllers/health.controller.ts`          | Health + details endpoints (thin — delegates to `SystemMetricsService`)             |
| `presentation/controllers/metrics.controller.ts`         | Prometheus scrape endpoint                                                          |

## Dependencies

- `@nestjs/terminus` — `HealthCheckService`, `DiskHealthIndicator`
- `@willsoto/nestjs-prometheus` — `InjectMetric`, Prometheus integration
- `prom-client` — `Gauge`, `Counter`, `register`

## Known caveat

`/metrics` is public (unauthenticated) at the application level, since Prometheus scrapers don't send a JWT. If this API is internet-facing, restrict access to it at the network/ingress level (e.g. allow only the scraper's IP) rather than relying on obscurity.
