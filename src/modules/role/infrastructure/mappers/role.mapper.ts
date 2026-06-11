import { PermissionEntity, RoleEntity } from '@entities';
import { RoleModel } from '@models';

export class RoleMapper {
  static toEntity(model: RoleModel): RoleEntity {
    const role = new RoleEntity(
      model.id,
      model.name,
      model.priority,
      model.created_at,
      model.updated_at,
    );

    if (model.permissions?.length) {
      role.permissions = model.permissions.map(
        (p) => new PermissionEntity(p.id, p.path, p.created_at, p.updated_at),
      );
    }

    return role;
  }
}
