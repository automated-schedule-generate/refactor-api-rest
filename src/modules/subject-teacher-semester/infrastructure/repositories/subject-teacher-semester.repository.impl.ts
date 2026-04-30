import { SubjectTeacherSemesterRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectTeacherSemesterModel } from '@models';
import { SubjectTeacherSemesterEntity } from '@entities';
import { SubjectTeacherSemesterMapper } from '@mappers';

@Injectable()
export class SubjectTeacherSemesterRepositoryImpl implements SubjectTeacherSemesterRepository {
  constructor(
    @InjectModel(SubjectTeacherSemesterModel)
    private model: typeof SubjectTeacherSemesterModel,
  ) {}

  async register(
    subject_id: string,
    teacher_id: string,
    semester_id: string,
  ): Promise<SubjectTeacherSemesterEntity> {
    const data = await this.model.create({
      subject_id,
      teacher_id,
      semester_id,
    });

    return SubjectTeacherSemesterMapper.toEntity(data.dataValues);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({
      where: {
        id,
      },
    });
  }
}
