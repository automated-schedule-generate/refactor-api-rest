import { SemesterEntity } from '@entities';
import { SemesterEnum } from '@enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class SemesterRepository {
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ semesters: SemesterEntity[]; total: number }>;

  abstract findById(id: string): Promise<SemesterEntity | null>;

  abstract register(
    year: string,
    semester: SemesterEnum,
  ): Promise<SemesterEntity>;

  abstract update(
    id: string,
    year: string,
    semester: SemesterEnum,
    is_finished?: boolean,
  ): Promise<SemesterEntity | null>;

  abstract delete(id: string): Promise<void>;
}
