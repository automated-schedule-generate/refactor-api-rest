import { SubjectRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectMapper } from '@mappers';
import type { SubjectEntity } from '@entities';
import { WorkloadEnum } from '@enums';
import { Op, Transaction } from 'sequelize';

@Injectable()
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(@InjectModel(SubjectModel) private model: typeof SubjectModel) {}

  async findAll(page: number, limit: number): Promise<SubjectEntity[]> {
    const subjects = await this.model.findAll({
      limit,
      offset: (page - 1) * limit,
    });
    return subjects.map((subject) =>
      SubjectMapper.toEntity(subject.dataValues),
    );
  }

  async findById(id: string): Promise<SubjectEntity | null> {
    const subject = await this.model.findOne({
      where: {
        id,
      },
    });
    if (!subject?.dataValues) {
      return null;
    }
    return SubjectMapper.toEntity(subject.dataValues);
  }

  async register(
    name: string,
    workload: WorkloadEnum,
    is_optional: boolean,
    course_id: string,
    prerequisite_id?: string,
    transaction?: Transaction,
  ): Promise<SubjectEntity> {
    const subject = await this.model.create(
      {
        name,
        workload,
        is_optional,
        prerequisite_id,
        course_id,
      },
      { transaction },
    );
    return SubjectMapper.toEntity(subject.dataValues);
  }

  async update(
    id: string,
    name: string,
    workload: WorkloadEnum,
    is_optional: boolean,
    course_id: string,
    prerequisite_id?: string,
    transaction?: Transaction,
  ): Promise<SubjectEntity | null> {
    const [, subject] = await this.model.update(
      {
        name,
        workload,
        is_optional,
        prerequisite_id,
        course_id,
      },
      {
        returning: true,
        where: {
          id,
        },
        transaction,
      },
    );
    if (!subject?.[0]?.dataValues) {
      return null;
    }
    return SubjectMapper.toEntity(subject[0].dataValues);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.model.destroy({
      where: {
        id,
      },
      transaction,
    });
  }

  async findByCourseId(
    course_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]> {
    const subjects = await this.model.findAll({
      where: {
        course_id,
      },
      limit,
      offset: (page - 1) * limit,
    });
    return subjects.map((subject) =>
      SubjectMapper.toEntity(subject.dataValues),
    );
  }

  async findAllByCourseId(course_id: string): Promise<SubjectEntity[]> {
    const subjects = await this.model.findAll({
      where: {
        course_id,
      },
    });
    return subjects.map((subject) =>
      SubjectMapper.toEntity(subject.dataValues),
    );
  }

  async findByPrerequisiteId(
    prerequisite_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]> {
    const subjects = await this.model.findAll({
      where: {
        prerequisite_id,
      },
      limit,
      offset: (page - 1) * limit,
    });
    return subjects.map((subject) =>
      SubjectMapper.toEntity(subject.dataValues),
    );
  }

  async findAllByPrerequisiteId(
    prerequisite_id: string,
  ): Promise<SubjectEntity[]> {
    const subjects = await this.model.findAll({
      where: {
        prerequisite_id,
      },
    });
    return subjects.map((subject) =>
      SubjectMapper.toEntity(subject.dataValues),
    );
  }

  async returningExistsIds(ids: string[]): Promise<string[]> {
    const subjects = await this.model.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return subjects.map((subject) => subject.dataValues.id);
  }
}
