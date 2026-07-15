import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.provide';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      return this.redis.set(key, value, 'EX', ttlSeconds);
    }
    return this.redis.set(key, value);
  }

  del(key: string) {
    return this.redis.del(key);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.redis.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  setJson(key: string, value: unknown, ttlSeconds?: number) {
    return this.set(key, JSON.stringify(value), ttlSeconds);
  }

  onModuleDestroy() {
    return this.redis.quit();
  }
}
