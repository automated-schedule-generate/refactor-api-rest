import { OrganizationRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationModel } from '@models';
import { OrganizationEntity } from '@entities';
import { OrganizationMapper } from '@mappers';
import { literal } from 'sequelize';
import { generateWhereValueToSearchByColumn } from '@commons/utils/generate-where-value-to-search-by-column.util';

@Injectable()
export class OrganizationRepositoryImpl implements OrganizationRepository {
  constructor(
    @InjectModel(OrganizationModel) private model: typeof OrganizationModel,
  ) {}

  async register(name: string, user_id: string): Promise<OrganizationEntity> {
    const organization = await this.model.create({ name, user_id });
    return OrganizationMapper.toEntity(organization.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    total: number;
    organizations: OrganizationEntity[];
  }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      where: search
        ? literal(generateWhereValueToSearchByColumn('name', search))
        : undefined,
      limit,
      offset,
      order: [['name', 'ASC']],
    });
    return {
      total: count,
      organizations: rows.map((organization) =>
        OrganizationMapper.toEntity(organization.dataValues),
      ),
    };
  }

  async findById(id: string): Promise<OrganizationEntity | null> {
    const organization = await this.model.findOne({ where: { id } });
    return organization?.dataValues
      ? OrganizationMapper.toEntity(organization.dataValues)
      : null;
  }

  async update(
    id: string,
    name: string,
    user_id: string,
  ): Promise<OrganizationEntity | null> {
    const [, organizations] = await this.model.update(
      { name, user_id },
      { where: { id }, returning: true },
    );
    if (!organizations?.[0]?.dataValues) {
      return null;
    }
    return OrganizationMapper.toEntity(organizations[0].dataValues);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }

  async softDelete(id: string): Promise<boolean> {
    const [count] = await this.model.update(
      { is_active: false },
      { where: { id } },
    );

    return count > 0;
  }

  async restore(id: string): Promise<OrganizationEntity | null> {
    const [, organizations] = await this.model.update(
      { is_active: true },
      { where: { id }, returning: true },
    );
    if (!organizations?.[0]?.dataValues) {
      return null;
    }
    return OrganizationMapper.toEntity(organizations[0].dataValues);
  }
}
