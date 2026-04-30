import { RegisterSubjectDto } from '@dtos';
import { SubjectEntity } from '@entities';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';

@Injectable()
export class RegisterSubjectUseCase {
  private readonly logger = new Logger(RegisterSubjectUseCase.name);

  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(dto: RegisterSubjectDto): Promise<SubjectEntity> {
    try {
      const course = await this.courseRepository.findById(dto.course_id);
      if (!course) {
        throw new NotFoundException('Curso não encontrado');
      }

      if (dto?.prerequisite_id) {
        const subjectExist = await this.subjectRepository.findById(
          dto.prerequisite_id,
        );
        if (!subjectExist) {
          throw new NotFoundException('Pré requisito não encontrado');
        }

        if (subjectExist.course_id !== dto.course_id) {
          throw new BadRequestException(
            'Pré requisito deve pertencer ao mesmo curso',
          );
        }
      }

      return await this.subjectRepository.register(
        dto.name,
        dto.workload,
        dto.is_optional,
        dto.course_id,
        dto?.prerequisite_id,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
