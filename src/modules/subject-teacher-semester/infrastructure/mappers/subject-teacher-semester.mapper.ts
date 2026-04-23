import { SubjectTeacherSemesterEntity } from '@entities';
import { SubjectTeacherSemesterModel } from '@models';

export class SubjectTeacherSemesterMapper {
  static toEntity(
    model: SubjectTeacherSemesterModel,
  ): SubjectTeacherSemesterEntity {
    return new SubjectTeacherSemesterEntity(
      model.id,
      model.subject_id,
      model.teacher_id,
      model.semester_id,
    );
  }
}
