import { SubjectTeacherSemesterEntity } from '@entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class SubjectTeacherSemesterRepository {
  abstract register(
    subject_id: string,
    teacher_id: string,
    semester_id: string,
  ): Promise<SubjectTeacherSemesterEntity>;

  abstract delete(id: string): Promise<void>;
}
