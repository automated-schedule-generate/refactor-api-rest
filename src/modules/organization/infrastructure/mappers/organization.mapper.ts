import { OrganizationEntity } from '@entities';
import { OrganizationModel } from '@models';

export class OrganizationMapper {
  static toEntity(model: OrganizationModel): OrganizationEntity {
    return new OrganizationEntity(
      model.id,
      model.name,
      model.user_id,
      model.is_active,
      model.created_at,
      model.updated_at,
    );
  }
}
