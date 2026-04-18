import { SubjectEntity } from '@entities';
import { CourseMapper } from '@mappers';
import { SubjectModel } from '@models';

export class SubjectMapper {
  static toEntity(model: SubjectModel): SubjectEntity {
    const subject = new SubjectEntity(
      model.id,
      model.name,
      model.workload,
      model.is_optional,
      model.prerequisite_id,
      model.course_id,
    );

    if (model?.prerequisite) {
      subject.prerequisite = this.toEntity(model.prerequisite);
    }

    if (model?.course) {
      subject.course = CourseMapper.toEntity(model.course);
    }

    return subject;
  }
}
