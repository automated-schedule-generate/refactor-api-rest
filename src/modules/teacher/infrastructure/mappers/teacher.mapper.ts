import { TeacherEntity } from '@entities';
import { TeacherModel } from '@models';

export class TeacherMapper {
  static toEntity(model: TeacherModel): TeacherEntity {
    return new TeacherEntity(
      model.user_id,
      model.special_need,
      model.description_special_need,
      model.observation,
      model.created_at,
      model.updated_at,
    );
  }
}
