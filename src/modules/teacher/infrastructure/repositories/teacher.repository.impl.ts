import { TeacherRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeacherModel } from '@models';
import { TeacherEntity } from '@entities';
import { TeacherMapper } from '@mappers';

@Injectable()
export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(@InjectModel(TeacherModel) private model: typeof TeacherModel) {}

  async register(
    user_id: string,
    special_need: boolean,
    description_special_need?: string,
    observation?: string,
  ): Promise<TeacherEntity> {
    const teacher = await this.model.create({
      user_id,
      special_need,
      description_special_need,
      observation,
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
    const teacher = await this.model.findOne({ where: { user_id } });
    if (!teacher) {
      return null;
    }
    return TeacherMapper.toEntity(teacher.dataValues);
  }
  async findAll(page: number, limit: number): Promise<TeacherEntity[]> {
    const teachers = await this.model.findAll({
      offset: (page - 1) * limit,
      limit,
      order: [['created_at', 'DESC']],
    });
    return teachers.map((teacher) =>
      TeacherMapper.toEntity(teacher.dataValues),
    );
  }
}
