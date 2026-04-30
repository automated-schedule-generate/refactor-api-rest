import { SubjectRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectMapper } from '@mappers';
import type { SubjectEntity } from '@entities';
import { Op, Transaction } from 'sequelize';
import { SubjectQueryBuilder } from '@builders';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(
    @InjectModel(SubjectModel) private model: typeof SubjectModel,
    private readonly subjectQueryBuilder: SubjectQueryBuilder,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(
    where: {
      search?: string;
      course_id?: string;
      prerequisite_id?: string;
      with_course?: boolean;
    },
    pagination?: {
      page: number;
      limit: number;
    },
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }> {
    const { query, replacements } = this.subjectQueryBuilder.findAll(
      pagination,
      where?.with_course,
      where?.course_id,
      where?.prerequisite_id,
      where?.search,
    );

    const result = (await this.sequelize.query(query, {
      replacements,
      raw: true,
      type: 'SELECT',
    })) as { total: number; data: SubjectModel[] }[];

    const subjects = result?.[0]?.data ?? [];
    const total = result?.[0]?.total ?? 0;

    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject, true),
      ),
      total: Number(total),
    };
  }

  async findById(id: string): Promise<SubjectEntity | null> {
    const subject = await this.model.findByPk(id);

    if (!subject) {
      return null;
    }

    return SubjectMapper.toEntity(subject.dataValues);
  }

  async findByIdWithIncludes(
    id: string,
    with_course?: boolean,
  ): Promise<SubjectEntity | null> {
    const { query, replacements } = this.subjectQueryBuilder.findById(
      id,
      with_course,
    );

    const result = (await this.sequelize.query(query, {
      replacements,
      raw: true,
      type: 'SELECT',
    })) as { total: number; data: SubjectModel[] }[];

    const subject = result?.[0]?.data?.[0] ?? null;

    if (!subject) {
      return null;
    }

    return SubjectMapper.toEntity(subject, true);
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
