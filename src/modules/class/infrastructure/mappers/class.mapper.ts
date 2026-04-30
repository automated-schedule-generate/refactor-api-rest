import { ClassEntity } from '@entities';
import { ClassModel } from '@models';

export class ClassMapper {
  static toEntity(model: ClassModel): ClassEntity {
    return new ClassEntity(
      model.id,
      model?.identify ?? null,
      model.shift,
      model.course_semester,
      model.course_id,
      model.semester_id,
      model.is_active,
      model.created_at,
      model.updated_at,
    );
  }
}
