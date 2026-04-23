import { SubjectRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SemesterModel, SubjectModel, TeacherModel, UserModel } from '@models';
import { SubjectMapper } from '@mappers';
import type { SubjectEntity } from '@entities';
import { Op, Transaction } from 'sequelize';

@Injectable()
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(@InjectModel(SubjectModel) private model: typeof SubjectModel) {}

  async findAll(
    where: {
      course_id?: string;
      prerequisite_id?: string;
    },
    pagination?: {
      page: number;
      limit: number;
    },
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }> {
    const { rows: subjects, count: total } = await this.model.findAndCountAll({
      ...(pagination?.page && pagination?.limit
        ? {
            limit: pagination.limit,
            offset: (pagination.page - 1) * pagination.limit,
          }
        : {}),
      where,
      include: [
        {
          model: TeacherModel,
          as: 'teachers',
          required: false,
          include: [
            {
              model: UserModel,
              as: 'user',
              required: true,
            },
          ],
        },
        {
          model: SemesterModel,
          as: 'semesters',
          required: false,
        },
      ],
    });
    return {
      subjects: subjects.map((subject) =>
        SubjectMapper.toEntity(subject.dataValues),
      ),
      total,
    };
  }

  async findById(
    id: string,
    includes: boolean = false,
  ): Promise<SubjectEntity | null> {
    const subject = await this.model.findOne({
      where: {
        id,
      },
      include: includes
        ? [
            {
              model: TeacherModel,
              as: 'teachers',
              required: false,
              include: [
                {
                  model: UserModel,
                  as: 'user',
                  required: true,
                },
              ],
            },
            {
              model: SemesterModel,
              as: 'semesters',
              required: false,
            },
          ]
        : [],
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
