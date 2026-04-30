import { PreferenceEntity } from '@entities';
import { PreferenceModel } from '@models';

export class PreferenceMapper {
  static toEntity(model: PreferenceModel): PreferenceEntity {
    return new PreferenceEntity(
      model.id,
      model.day,
      model.turn,
      model.teacherId,
    );
  }
}
