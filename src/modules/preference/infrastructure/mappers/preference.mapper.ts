import { PreferenceEntity } from '@entities';
import { PreferenceTimeMapper, TeacherMapper } from '@mappers';
import { PreferenceModel } from '@models';

export class PreferenceMapper {
  static toEntity(model: PreferenceModel): PreferenceEntity {
    const preference = new PreferenceEntity(
      model.id,
      model.day,
      model.turn,
      model.user_id,
      model.preferenceTimes?.map((pt) =>
        PreferenceTimeMapper.toEntity(pt.dataValues),
      ) ?? [],
    );
    if (model?.teacher) {
      preference.teacher = TeacherMapper.toEntity(model.teacher.dataValues);
    }
    return preference;
  }
}
