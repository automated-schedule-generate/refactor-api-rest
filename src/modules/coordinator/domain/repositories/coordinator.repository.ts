import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { CoordinatorEntity } from '@entities';

@Injectable()
export abstract class CoordinatorRepository {
  abstract create(
    start: Date,
    end: Date | null,
    teacher_id: string,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity>;
  abstract update(
    id: string,
    start: Date,
    end: Date | null,
    teacher_id: string,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity | null>;
  abstract delete(id: string, transaction?: Transaction): Promise<void>;
  abstract findById(id: string): Promise<CoordinatorEntity | null>;
  abstract findAll(page: number, limit: number): Promise<CoordinatorEntity[]>;
  abstract findByTeacherId(teacher_id: string): Promise<CoordinatorEntity[]>;
}
