import { SubjectEntity } from '@entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubjectRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllSubjectsByPrerequisiteIdUseCase {
  private readonly logger = new Logger(
    FindAllSubjectsByPrerequisiteIdUseCase.name,
  );

  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(prerequisite_id: string) {
    try {
      const subjectExist =
        await this.subjectRepository.findById(prerequisite_id);

      if (!subjectExist) {
        throw new NotFoundException('Prerequisite subject not found');
      }

      const { subjects, total } = await this.subjectRepository.findAll({
        prerequisite_id,
      });

      return paginationWrapper<SubjectEntity>(subjects, total);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
