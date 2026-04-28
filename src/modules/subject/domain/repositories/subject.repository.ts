import { SubjectEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export abstract class SubjectRepository {
  abstract findAll(
    where: {
      course_id?: string;
      prerequisite_id?: string;
      with_course?: boolean;
    },
    pagination?: {
      page: number;
      limit: number;
    },
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }>;

  abstract findById(id: string): Promise<SubjectEntity | null>;

  abstract findByIdWithIncludes(
    id: string,
    with_course?: boolean,
  ): Promise<SubjectEntity | null>;

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

  abstract returningExistsIds(ids: string[]): Promise<string[]>;
}
