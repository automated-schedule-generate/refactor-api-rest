import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SubjectRepository } from '@repositories';

@Injectable()
export class DeleteSubjectUseCase {
  private readonly logger = new Logger(DeleteSubjectUseCase.name);

  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    try {
      const subjectExist = await this.subjectRepository.findById(id);
      if (!subjectExist) {
        throw new NotFoundException('Subject not found');
      }
      const prerequisiteSubjects = await this.subjectRepository.findAll(
        {
          prerequisite_id: id,
        },
        {
          limit: 1,
          page: 1,
        },
      );
      if (prerequisiteSubjects.subjects.length > 0) {
        throw new ConflictException({
          message:
            'Subject cannot be deleted because it is a prerequisite for other subjects',
          subjects: prerequisiteSubjects.subjects,
        });
      }
      await this.subjectRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
