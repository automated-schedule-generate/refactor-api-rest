import { PreferenceEntity } from '@entities';
import { PreferenceTimeMapper } from '@mappers';
import { PreferenceModel } from '@models';

export class PreferenceMapper {
  static toEntity(model: PreferenceModel): PreferenceEntity {
    return new PreferenceEntity(
      model.id,
      model.day,
      model.turn,
      model.user_id,
      model.preferenceTimes?.map((pt) =>
        PreferenceTimeMapper.toEntity(pt.dataValues),
      ) ?? [],
    );
  }
}
