import { SubjectEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export abstract class SubjectRepository {
  abstract findAll(page: number, limit: number): Promise<SubjectEntity[]>;

  abstract findById(id: string): Promise<SubjectEntity | null>;

  abstract register(
    name: string,
    workload: number,
    is_optional: boolean,
    course_id: string,
    prerequisite_id?: string,
    transaction?: Transaction,
  ): Promise<SubjectEntity>;

  abstract update(
    id: string,
    name: string,
    workload: number,
    is_optional: boolean,
    course_id: string,
    prerequisite_id?: string,
    transaction?: Transaction,
  ): Promise<SubjectEntity | null>;

  abstract delete(id: string, transaction?: Transaction): Promise<void>;

  abstract findByCourseId(
    course_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]>;

  abstract findAllByCourseId(course_id: string): Promise<SubjectEntity[]>;

  abstract findByPrerequisiteId(
    prerequisite_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]>;

  abstract findAllByPrerequisiteId(
    prerequisite_id: string,
  ): Promise<SubjectEntity[]>;

  abstract returningExistsIds(ids: string[]): Promise<string[]>;
}
