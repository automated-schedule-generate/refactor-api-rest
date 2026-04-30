import { ClassEntity } from '@entities';
import { ShiftEnum } from '@enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ClassRepository {
  abstract register(
    identify: string | null,
    shift: ShiftEnum,
    course_semester: number,
    course_id: string,
    semester_id: string,
  ): Promise<ClassEntity>;

  abstract findAll(
    page: number,
    limit: number,
    filters?: {
      shift?: ShiftEnum;
      course_id?: string;
      semester_id?: string;
    },
  ): Promise<{
    classes: ClassEntity[];
    total: number;
  }>;

  abstract findById(id: string): Promise<ClassEntity | null>;

  abstract update(
    id: string,
    identify: string | null,
    shift: ShiftEnum,
    course_semester: number,
    course_id: string,
    semester_id: string,
  ): Promise<ClassEntity | null>;

  abstract delete(id: string): Promise<void>;
}
