import { UserRoleOrganizationRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  OrganizationModel,
  UserModel,
  UserRoleOrganizationModel,
} from '@models';
import { UserRoleOrganizationEntity } from '@entities';
import { UserRoleOrganizationMapper } from '@mappers';
import { RoleModel } from '../../../role/infrastructure/models/role.model';
import { PermissionModel } from '../../../permission/infrastructure/models/permission.model';

@Injectable()
export class UserRoleOrganizationRepositoryImpl implements UserRoleOrganizationRepository {
  constructor(
    @InjectModel(UserRoleOrganizationModel)
    private model: typeof UserRoleOrganizationModel,
  ) {}

  private get includeAll() {
    return [
      { model: UserModel },
      {
        model: RoleModel,
        include: [{ model: PermissionModel, through: { attributes: [] } }],
      },
      { model: OrganizationModel },
    ];
  }

  async register(
    user_id: string,
    role_id: string,
    organization_id: string,
  ): Promise<UserRoleOrganizationEntity> {
    const entry = await this.model.create({
      user_id,
      role_id,
      organization_id,
    });
    const full = await this.model.findOne({
      where: { id: entry.id },
      include: this.includeAll,
    });
    return UserRoleOrganizationMapper.toEntity(full!.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; entries: UserRoleOrganizationEntity[] }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      include: this.includeAll,
      limit,
      offset,
    });
    return {
      total: count,
      entries: rows.map((r) =>
        UserRoleOrganizationMapper.toEntity(r.dataValues),
      ),
    };
  }

  async findByUserId(user_id: string): Promise<UserRoleOrganizationEntity[]> {
    const rows = await this.model.findAll({
      where: { user_id },
      include: this.includeAll,
    });
    return rows.map((r) => UserRoleOrganizationMapper.toEntity(r.dataValues));
  }

  async findById(id: string): Promise<UserRoleOrganizationEntity | null> {
    const entry = await this.model.findOne({
      where: { id },
      include: this.includeAll,
    });
    return entry?.dataValues
      ? UserRoleOrganizationMapper.toEntity(entry.dataValues)
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }
}
