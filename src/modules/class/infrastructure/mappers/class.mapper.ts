import { ClassEntity } from '@entities';
import { CourseMapper, SemesterMapper } from '@mappers';
import { ClassModel } from '@models';

export class ClassMapper {
  static toEntity(model: ClassModel): ClassEntity {
    const classEntity = new ClassEntity(
      model.id,
      model?.identify ?? null,
      model.shift,
      model.course_semester,
      model.course_id,
      model.semester_id,
      model.current_semester,
      model.is_active,
      model.created_at,
      model.updated_at,
    );
    if (model?.course) {
      classEntity.course = CourseMapper.toEntity(model.course.dataValues);
    }

    if (model?.semester) {
      classEntity.semester = SemesterMapper.toEntity(model.semester.dataValues);
    }
    return classEntity;
  }
}
