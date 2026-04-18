import { CourseRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseModel } from '@models';
import { CourseMapper } from '@mappers';
import { ClassTimeEnum } from '@enums';
import { Transaction } from 'sequelize';
import { CourseEntity } from '@entities';

@Injectable()
export class CourseRepositoryImpl implements CourseRepository {
  constructor(@InjectModel(CourseModel) private model: typeof CourseModel) {}

  async register(
    name: string,
    total_semesters: number,
    class_time: ClassTimeEnum,
    transaction?: Transaction,
  ): Promise<CourseEntity> {
    const course = await this.model.create(
      {
        name,
        total_semesters,
        class_time,
      },
      { transaction },
    );
    return CourseMapper.toEntity(course.dataValues);
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const course = await this.model.findOne({ where: { name } });
    return course?.dataValues ? CourseMapper.toEntity(course.dataValues) : null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    courses: CourseEntity[];
    total: number;
  }> {
    const { rows: courses, count: total } = await this.model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: [['name', 'ASC']],
    });
    return {
      courses: courses.map((course) =>
        CourseMapper.toEntity(course.dataValues),
      ),
      total,
    };
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.model.findOne({ where: { id } });
    return course?.dataValues ? CourseMapper.toEntity(course.dataValues) : null;
  }

  async update(
    id: string,
    name: string,
    total_semesters: number,
    class_time: ClassTimeEnum,
    transaction?: Transaction,
  ): Promise<CourseEntity | null> {
    const [, course] = await this.model.update(
      {
        name,
        total_semesters,
        class_time,
      },
      { where: { id }, transaction, returning: true },
    );
    return course?.[0] ? CourseMapper.toEntity(course[0].dataValues) : null;
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.model.destroy({ where: { id }, transaction });
  }
}
