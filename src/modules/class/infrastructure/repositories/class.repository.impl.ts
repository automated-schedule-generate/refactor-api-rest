import { ClassRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel, SemesterModel } from '@models';
import { ClassMapper } from '@mappers';
import { ClassEntity } from '@entities';
import { ShiftEnum } from '@enums';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ClassRepositoryImpl implements ClassRepository {
  constructor(@InjectModel(ClassModel) private model: typeof ClassModel) {}

  async register(
    identify: string | null,
    shift: ShiftEnum,
    course_semester: number,
    course_id: string,
    semester_id: string,
  ): Promise<ClassEntity> {
    const classModel = await this.model.create({
      identify: identify ?? undefined,
      shift,
      course_semester,
      course_id,
      semester_id,
    });

    return ClassMapper.toEntity(classModel.dataValues);
  }

  async findAll(
    page: number,
    limit: number,
    filters: {
      shift?: ShiftEnum;
      course_id?: string;
      semester_id?: string;
    } = {},
  ): Promise<{ classes: ClassEntity[]; total: number }> {
    const where: WhereOptions<ClassModel> = {};

    if (filters?.shift) where.shift = filters.shift;
    if (filters?.course_id) where.course_id = filters.course_id;
    if (filters?.semester_id) where.semester_id = filters.semester_id;

    const { rows, count } = await this.model.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where,
      include: [
        {
          model: SemesterModel,
          as: 'semester',
          attributes: [],
          order: [
            ['year', 'desc'],
            ['semester', 'desc'],
          ],
        },
      ],
    });

    return {
      classes: rows.map((item) => ClassMapper.toEntity(item.dataValues)),
      total: count,
    };
  }

  async findById(id: string): Promise<ClassEntity | null> {
    const classModel = await this.model.findOne({
      where: { id },
    });

    return classModel ? ClassMapper.toEntity(classModel.dataValues) : null;
  }

  async update(
    id: string,
    identify: string | null,
    shift: ShiftEnum,
    course_semester: number,
    course_id: string,
    semester_id: string,
  ): Promise<ClassEntity | null> {
    const [, classUpdated] = await this.model.update(
      {
        identify: identify ?? undefined,
        shift,
        course_semester,
        course_id,
        semester_id,
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (!classUpdated?.[0]?.dataValues) return null;

    return ClassMapper.toEntity(classUpdated[0].dataValues);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({
      where: { id },
    });
  }
}
