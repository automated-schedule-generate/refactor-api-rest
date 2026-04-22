import { SemesterEntity } from '@entities';
import { SemesterModel } from '@models';

export class SemesterMapper {
  static toEntity(model: SemesterModel): SemesterEntity {
    return new SemesterEntity(
      model.id,
      model.year,
      model.semester,
      model.is_finished,
      model.created_at,
      model.updated_at,
    );
  }
}
