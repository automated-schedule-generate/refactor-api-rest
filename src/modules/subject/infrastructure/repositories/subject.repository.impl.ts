import { SubjectRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectMapper } from '@mappers';
import type { SubjectEntity } from '@entities';
import { Op, Transaction } from 'sequelize';

@Injectable()
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(@InjectModel(SubjectModel) private model: typeof SubjectModel) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
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
    workload: number,
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
    workload: number,
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
  ): Promise<{ subjects: SubjectEntity[]; total: number }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      where: {
        course_id,
      },
      limit,
      offset: (page - 1) * limit,
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
  }

  async findAllByCourseId(
    course_id: string,
  ): Promise<{ subjects: SubjectEntity[]; total: number }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      where: {
        course_id,
      },
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
  }

  async findByPrerequisiteId(
    prerequisite_id: string,
    page: number,
    limit: number,
  ): Promise<{ subjects: SubjectEntity[]; total: number }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      where: {
        prerequisite_id,
      },
      limit,
      offset: (page - 1) * limit,
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
  }

  async findAllByPrerequisiteId(
    prerequisite_id: string,
  ): Promise<{ subjects: SubjectEntity[]; total: number }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      where: {
        prerequisite_id,
      },
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
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
