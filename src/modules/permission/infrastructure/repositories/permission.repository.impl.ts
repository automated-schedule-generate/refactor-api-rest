import { PermissionRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionModel } from '@models';
import { PermissionEntity } from '@entities';
import { PermissionMapper } from '@mappers';
import { literal } from 'sequelize';
import { generateWhereValueToSearchByColumn } from '@commons/utils/generate-where-value-to-search-by-column.util';

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectModel(PermissionModel) private model: typeof PermissionModel,
  ) {}

  async register(path: string): Promise<PermissionEntity> {
    const permission = await this.model.create({ path });
    return PermissionMapper.toEntity(permission.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ total: number; permissions: PermissionEntity[] }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      where: search
        ? literal(generateWhereValueToSearchByColumn('path', search))
        : undefined,
      limit,
      offset,
      order: [['path', 'ASC']],
    });
    return {
      total: count,
      permissions: rows.map((p) => PermissionMapper.toEntity(p.dataValues)),
    };
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const permission = await this.model.findOne({ where: { id } });
    return permission?.dataValues
      ? PermissionMapper.toEntity(permission.dataValues)
      : null;
  }

  async update(id: string, path: string): Promise<PermissionEntity | null> {
    const [, permissions] = await this.model.update(
      { path },
      { where: { id }, returning: true },
    );
    if (!permissions?.[0]?.dataValues) return null;
    return PermissionMapper.toEntity(permissions[0].dataValues);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }
}
