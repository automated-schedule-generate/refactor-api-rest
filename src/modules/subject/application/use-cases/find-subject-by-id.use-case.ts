import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubjectRepository } from '@repositories';

@Injectable()
export class FindSubjectByIdUseCase {
  private readonly logger = new Logger(FindSubjectByIdUseCase.name);
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    try {
      const subject = await this.subjectRepository.findById(id);

      if (!subject) {
        throw new NotFoundException('Subject not found');
      }

      return subject;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
