import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';
import { RegisterManySubjectDto } from '../dtos/register-many-subject.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RegisterManySubjectsUseCase {
  private readonly logger = new Logger(RegisterManySubjectsUseCase.name);

  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly courseRepository: CourseRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async execute(dto: RegisterManySubjectDto) {
    try {
      const courseExist = await this.courseRepository.findById(dto.course_id);

      if (!courseExist) {
        throw new NotFoundException('Course not found');
      }

      const transaction = await this.sequelize.transaction();

      try {
        await Promise.all(
          dto.subjects.map((subject) =>
            this.subjectRepository.register(
              subject.name,
              subject.workload,
              subject.is_optional,
              dto.course_id,
              subject.prerequisite_id,
              transaction,
            ),
          ),
        );

        await transaction.commit();
      } catch {
        await transaction.rollback();
        throw new InternalServerErrorException('Failed to register subjects');
      }
    } catch (error) {
      this.logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
