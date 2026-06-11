import { UserRoleOrganizationEntity } from '@entities';
import { UserRoleOrganizationModel } from '@models';
import { OrganizationMapper } from '@mappers';
import { RoleMapper } from '../../../role/infrastructure/mappers/role.mapper';
import { UserMapper } from '../../../user/infrastructure/mappers/user.mapper';

export class UserRoleOrganizationMapper {
  static toEntity(
    model: UserRoleOrganizationModel,
  ): UserRoleOrganizationEntity {
    const entity = new UserRoleOrganizationEntity(
      model.id,
      model.user_id,
      model.role_id,
      model.organization_id,
      model.created_at,
      model.updated_at,
    );

    if (model.user?.dataValues) {
      entity.user = UserMapper.toEntity(model.user.dataValues);
    }
    if (model.role?.dataValues) {
      entity.role = RoleMapper.toEntity(model.role.dataValues);
    }
    if (model.organization?.dataValues) {
      entity.organization = OrganizationMapper.toEntity(
        model.organization.dataValues,
      );
    }

    return entity;
  }
}
