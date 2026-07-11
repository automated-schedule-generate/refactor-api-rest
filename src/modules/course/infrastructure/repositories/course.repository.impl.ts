import { CourseRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseModel } from '@models';
import { CourseMapper } from '@mappers';
import { ClassTimeEnum } from '@enums';
import { QueryTypes, Transaction, literal } from 'sequelize';
import { CourseEntity, TimetableEntryEntity } from '@entities';
import { generateWhereValueToSearchByColumn } from 'src/commons/utils/generate-where-value-to-search-by-column.util';
import { CourseQueryBuilder } from '../query-builders/course.query-builder';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CourseRepositoryImpl implements CourseRepository {
  constructor(
    @InjectModel(CourseModel) private readonly model: typeof CourseModel,
    private readonly sequelize: Sequelize,
    private readonly courseQueryBuilder: CourseQueryBuilder,
  ) {}

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
    search?: string,
  ): Promise<{
    courses: CourseEntity[];
    total: number;
  }> {
    const { rows: courses, count: total } = await this.model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: [['name', 'ASC']],
      where: search
        ? literal(generateWhereValueToSearchByColumn('name', search))
        : undefined,
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

  async findWithTimetable(
    semester_id: string,
    course_id?: string,
    course_semester?: string,
    teacher_id?: string,
  ): Promise<{
    courses: CourseEntity[];
    total: number;
  }> {
    try {
      const { query, replacements } =
        this.courseQueryBuilder.findCourseWithTimetableBySemester(
          semester_id,
          course_id,
          course_semester,
          teacher_id,
        );

      const data: {
        result: (CourseModel & {
          timetable_entries: TimetableEntryEntity[];
          generated_at: Date;
        })[];
        total: string;
      }[] = await this.sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });

      if (!data?.[0]?.result || data?.[0]?.result.length === 0) {
        return {
          courses: [],
          total: 0,
        };
      }

      return {
        courses: data[0].result.map((d) =>
          CourseMapper.toEntity(d, {
            timetable_entries: d.timetable_entries,
            timetable_generated_at: d.generated_at,
          }),
        ),
        total: Number(data[0].total),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
