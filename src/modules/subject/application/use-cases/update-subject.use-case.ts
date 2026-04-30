import { UpdateSubjectDto } from '@dtos';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';

@Injectable()
export class UpdateSubjectUseCase {
  private readonly logger = new Logger(UpdateSubjectUseCase.name);

  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(id: string, dto: UpdateSubjectDto) {
    try {
      const subjectExist = await this.subjectRepository.findById(id);

      if (!subjectExist) {
        throw new NotFoundException('Disciplina não encontrada');
      }

      const course = await this.courseRepository.findById(dto.course_id);
      if (!course) {
        throw new NotFoundException('Curso não encontrado');
      }

      if (dto?.prerequisite_id) {
        const subjectExistPre = await this.subjectRepository.findById(
          dto.prerequisite_id,
        );
        if (!subjectExistPre) {
          throw new NotFoundException('Pré requisito não encontrado');
        }
        if (subjectExistPre.course_id !== dto.course_id) {
          throw new BadRequestException(
            'Pré requisito deve pertencer ao mesmo curso',
          );
        }
      }

      const subject = await this.subjectRepository.update(
        id,
        dto.name,
        dto.workload,
        dto.is_optional,
        dto.course_id,
        dto?.prerequisite_id,
      );

      if (!subject) {
        throw new HttpException(
          'Não foi possível atualizar a disciplina.',
          500,
        );
      }

      return subject;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
