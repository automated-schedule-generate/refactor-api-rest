import { RoleRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionModel, RoleModel, RolePermissionModel } from '@models';
import { RoleEntity } from '@entities';
import { RoleMapper } from '@mappers';
import { literal } from 'sequelize';
import { generateWhereValueToSearchByColumn } from '@commons/utils/generate-where-value-to-search-by-column.util';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectModel(RoleModel) private model: typeof RoleModel,
    @InjectModel(RolePermissionModel)
    private rolePermissionModel: typeof RolePermissionModel,
  ) {}

  async register(name: string, priority: number): Promise<RoleEntity> {
    const role = await this.model.create({ name, priority });
    return RoleMapper.toEntity(role.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ total: number; roles: RoleEntity[] }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      where: search
        ? literal(generateWhereValueToSearchByColumn('name', search))
        : undefined,
      include: [{ model: PermissionModel, through: { attributes: [] } }],
      limit,
      offset,
      order: [['priority', 'ASC']],
    });
    return {
      total: count,
      roles: rows.map((r) => RoleMapper.toEntity(r.dataValues)),
    };
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.model.findOne({
      where: { id },
      include: [{ model: PermissionModel, through: { attributes: [] } }],
    });
    return role?.dataValues ? RoleMapper.toEntity(role.dataValues) : null;
  }

  async update(
    id: string,
    name: string,
    priority: number,
  ): Promise<RoleEntity | null> {
    const [, roles] = await this.model.update(
      { name, priority },
      { where: { id }, returning: true },
    );
    if (!roles?.[0]?.dataValues) return null;
    return RoleMapper.toEntity(roles[0].dataValues);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }

  async addPermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity | null> {
    await this.rolePermissionModel.findOrCreate({
      where: { role_id: roleId, permission_id: permissionId },
    });
    return this.findById(roleId);
  }

  async removePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity | null> {
    await this.rolePermissionModel.destroy({
      where: { role_id: roleId, permission_id: permissionId },
    });
    return this.findById(roleId);
  }
}
