import { PermissionEntity } from '@entities';
import { PermissionModel } from '@models';

export class PermissionMapper {
  static toEntity(model: PermissionModel): PermissionEntity {
    return new PermissionEntity(
      model.id,
      model.path,
      model.created_at,
      model.updated_at,
    );
  }
}
