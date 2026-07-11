import { CourseEntity } from '@entities';
import { ClassTimeEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export abstract class CourseRepository {
  abstract register(
    name: string,
    total_semesters: number,
    class_time: ClassTimeEnum,
    transaction?: Transaction,
  ): Promise<CourseEntity>;

  abstract findByName(name: string): Promise<CourseEntity | null>;

  abstract findById(id: string): Promise<CourseEntity | null>;

  abstract findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    courses: CourseEntity[];
    total: number;
  }>;

  abstract update(
    id: string,
    name: string,
    total_semesters: number,
    class_time: ClassTimeEnum,
    transaction?: Transaction,
  ): Promise<CourseEntity | null>;

  abstract delete(id: string, transaction?: Transaction): Promise<void>;

  abstract findWithTimetable(
    semester_id: string,
    course_id?: string,
    course_semester?: string,
    teacher_id?: string,
  ): Promise<{
    courses: CourseEntity[];
    total: number;
  }>;
}
