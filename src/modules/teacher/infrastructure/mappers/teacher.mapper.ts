import { TeacherEntity } from '@entities';
import { CoordinatorMapper, UserMapper } from '@mappers';
import { TeacherModel } from '@models';

export class TeacherMapper {
  static toEntity(model: TeacherModel): TeacherEntity {
    const teacher = new TeacherEntity(
      model.user_id,
      model.special_need,
      model.description_special_need,
      model.observation,
      model.workload,
      model.created_at,
      model.updated_at,
    );

    if (model?.coordinators && model.coordinators.length > 0) {
      teacher.coordinators = model.coordinators.map((coordinator) =>
        CoordinatorMapper.toEntity(coordinator.dataValues),
      );
    }

    if (model?.user && model.user.dataValues) {
      teacher.user = UserMapper.toEntity(model.user.dataValues);
    }

    return teacher;
  }
}
