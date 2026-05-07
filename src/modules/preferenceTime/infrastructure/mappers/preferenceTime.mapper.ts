import { PreferenceTimeEntity } from '@entities';
import { PreferenceTimeModel } from '@models';

export class PreferenceTimeMapper {
  static toEntity(model: PreferenceTimeModel): PreferenceTimeEntity {
    return new PreferenceTimeEntity(
      model.id,
      model.preference_id,
      model.selected,
    );
  }
}
