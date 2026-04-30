import { SubjectEntity } from '@entities';
import { CourseMapper, SemesterMapper, TeacherMapper } from '@mappers';
import { SubjectModel } from '@models';

export class SubjectMapper {
  static toEntity(
    model: SubjectModel,
    manual_query: boolean = false,
  ): SubjectEntity {
    const subject = new SubjectEntity(
      model.id,
      model.name,
      model.workload,
      model.is_optional,
      model.prerequisite_id,
      model.course_id,
    );
    if (!manual_query) {
      if (model?.prerequisite) {
        subject.prerequisite = this.toEntity(model.prerequisite.dataValues);
      }

      if (model?.course) {
        subject.course = CourseMapper.toEntity(model.course.dataValues);
      }

      if (model?.teachers) {
        subject.teachers = model.teachers.map((teacher) =>
          TeacherMapper.toEntity(teacher.dataValues),
        );
      }

      if (model?.semesters) {
        subject.semesters = model.semesters.map((semester) =>
          SemesterMapper.toEntity(semester.dataValues),
        );
      }
    } else {
      if (model?.prerequisite) {
        subject.prerequisite = this.toEntity(model.prerequisite, true);
      }

      if (model?.course) {
        subject.course = CourseMapper.toEntity(model.course);
      }

      if (model?.teachers) {
        subject.teachers = model.teachers.map((teacher) =>
          TeacherMapper.toEntity(teacher, true),
        );
      }

      if (model?.semesters) {
        subject.semesters = model.semesters.map((semester) =>
          SemesterMapper.toEntity(semester),
        );
      }
    }

    return subject;
  }
}
