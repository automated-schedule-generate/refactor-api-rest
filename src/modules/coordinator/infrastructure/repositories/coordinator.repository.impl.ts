import { CoordinatorRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CoordinatorModel } from '@models';
import { Op, Transaction } from 'sequelize';

import { CoordinatorEntity } from '@entities';
import { CoordinatorMapper } from '@mappers';

@Injectable()
export class CoordinatorRepositoryImpl implements CoordinatorRepository {
  constructor(
    @InjectModel(CoordinatorModel) private model: typeof CoordinatorModel,
  ) {}

  async create(
    start: Date,
    end: Date | null,
    teacher_id: string,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity> {
    const coordinator = await this.model.create(
      { start, end, teacher_id },
      { transaction },
    );
    return CoordinatorMapper.toEntity(coordinator.dataValues);
  }

  async update(
    id: string,
    start: Date,
    end: Date | null,
    teacher_id: string,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity | null> {
    const [, coordinator] = await this.model.update(
      { start, end, teacher_id },
      { where: { id }, returning: true, transaction },
    );
    if (!coordinator?.[0]?.dataValues) {
      return null;
    }
    return CoordinatorMapper.toEntity(coordinator[0].dataValues);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.model.destroy({
      where: { id },
      transaction,
    });
  }

  async findById(id: string): Promise<CoordinatorEntity | null> {
    const coordinator = await this.model.findByPk(id);
    if (!coordinator?.dataValues) {
      return null;
    }
    return CoordinatorMapper.toEntity(coordinator?.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity[]> {
    const coordinators = await this.model.findAll({
      offset: (page - 1) * limit,
      limit,
      transaction,
    });
    return coordinators.map((coordinator) =>
      CoordinatorMapper.toEntity(coordinator.dataValues),
    );
  }

  async findByTeacherId(
    teacher_id: string,
    transaction?: Transaction,
  ): Promise<CoordinatorEntity[]> {
    const coordinators = await this.model.findAll({
      where: { teacher_id, end: { [Op.is]: null } },
      transaction,
    });
    return coordinators.map((coordinator) =>
      CoordinatorMapper.toEntity(coordinator.dataValues),
    );
  }
}
