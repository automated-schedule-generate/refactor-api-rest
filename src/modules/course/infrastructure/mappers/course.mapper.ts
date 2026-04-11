import { CourseEntity } from '@entities';
import { CourseModel } from '@models';

export class CourseMapper {
  static toEntity(model: CourseModel): CourseEntity {
    return new CourseEntity(
      model.id,
      model.name,
      model.total_semesters,
      model.class_time,
    );
  }
}
