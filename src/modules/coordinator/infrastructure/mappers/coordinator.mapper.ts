import { CoordinatorEntity } from '@entities';
import { CoordinatorModel } from '@models';

export class CoordinatorMapper {
  static toEntity(model: CoordinatorModel): CoordinatorEntity {
    return new CoordinatorEntity(
      model.id,
      model.start,
      model.end,
      model.teacher_id,
    );
  }
}
