import { SemesterRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SemesterModel } from '@models';
import { SemesterEnum } from '@enums';
import { SemesterMapper } from '@mappers';
import { SemesterEntity } from '@entities';

@Injectable()
export class SemesterRepositoryImpl implements SemesterRepository {
  constructor(
    @InjectModel(SemesterModel) private model: typeof SemesterModel,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ semesters: SemesterEntity[]; total: number }> {
    const semesters = await this.model.findAll({
      limit,
      offset: (page - 1) * limit,
      order: [
        ['year', 'DESC'],
        ['semester', 'DESC'],
      ],
    });

    return {
      semesters: semesters.map((semester) =>
        SemesterMapper.toEntity(semester.dataValues),
      ),
      total: await this.model.count(),
    };
  }

  async findById(id: string): Promise<SemesterEntity | null> {
    const semester = await this.model.findOne({
      where: {
        id,
      },
    });

    if (!semester?.dataValues) {
      return null;
    }

    return SemesterMapper.toEntity(semester.dataValues);
  }

  async register(
    year: string,
    semester: SemesterEnum,
  ): Promise<SemesterEntity> {
    const semesterCreated = await this.model.create({
      year,
      semester,
    });

    return SemesterMapper.toEntity(semesterCreated.dataValues);
  }

  async update(
    id: string,
    year: string,
    semester: SemesterEnum,
    is_finished?: boolean,
  ): Promise<SemesterEntity | null> {
    const [, semesterUpdated] = await this.model.update(
      {
        year,
        semester,
        is_finished,
      },
      {
        where: { id },
        returning: true,
        individualHooks: true,
      },
    );

    if (!semesterUpdated?.[0]?.dataValues) {
      return null;
    }

    return SemesterMapper.toEntity(semesterUpdated[0].dataValues);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({
      where: { id },
    });
  }
}
