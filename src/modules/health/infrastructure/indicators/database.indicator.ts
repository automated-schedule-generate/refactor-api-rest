import { IIndicator } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseIndicator extends HealthIndicator implements IIndicator {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const start = Date.now();
    try {
      await this.sequelize.authenticate();
      const latency = Date.now() - start;

      return this.getStatus(key, true, {
        latency: `${latency}ms`,
        dialect: this.sequelize.getDialect(),
        database: this.sequelize.getDatabaseName(),
      });
    } catch (error) {
      const result = this.getStatus(key, false, { message: error.message });
      throw new HealthCheckError('Database check failed', result);
    }
  }
}
