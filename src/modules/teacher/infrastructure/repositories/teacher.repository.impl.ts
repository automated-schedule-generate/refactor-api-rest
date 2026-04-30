import { TeacherRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeacherModel, UserModel } from '@models';
import { TeacherEntity } from '@entities';
import { TeacherMapper } from '@mappers';
import { WorkloadEnum } from '@enums';
import { literal } from 'sequelize';
import { generateWhereValueToSearchByColumn } from 'src/commons/utils/generate-where-value-to-search-by-column.util';

@Injectable()
export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(@InjectModel(TeacherModel) private model: typeof TeacherModel) {}

  async register(
    user_id: string,
    workload: WorkloadEnum,
  ): Promise<TeacherEntity> {
    const teacher = await this.model.create({
      user_id,
      workload,
    });
    return TeacherMapper.toEntity(teacher.dataValues);
  }
  async update(
    user_id: string,
    special_need: boolean,
    description_special_need?: string,
    observation?: string,
  ): Promise<TeacherEntity | null> {
    const [, teacher] = await this.model.update(
      {
        special_need,
        description_special_need,
        observation,
      },
      { where: { user_id }, returning: true },
    );

    if (teacher.length === 0) {
      return null;
    }

    return TeacherMapper.toEntity(teacher[0].dataValues);
  }
  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
  async findByUserId(user_id: string): Promise<TeacherEntity | null> {
    const teacher = await this.model.findOne({
      where: { user_id },
      include: [
        {
          model: UserModel,
          as: 'user',
          required: true,
        },
      ],
    });
    if (!teacher) {
      return null;
    }
    return TeacherMapper.toEntity(teacher.dataValues);
  }
  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    teachers: TeacherEntity[];
    total: number;
  }> {
    const { rows: teachers, count: total } = await this.model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: [[{ model: UserModel, as: 'user' }, 'name', 'ASC']],
      where: search
        ? literal(generateWhereValueToSearchByColumn('"user"."name"', search))
        : undefined,
      include: [
        {
          model: UserModel,
          as: 'user',
          required: true,
        },
      ],
    });

    return {
      teachers: teachers.map((teacher) =>
        TeacherMapper.toEntity(teacher.dataValues),
      ),
      total,
    };
  }
}
