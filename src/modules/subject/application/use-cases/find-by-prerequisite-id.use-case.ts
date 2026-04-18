import { SubjectEntity } from '@entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubjectRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindByPrerequisiteIdUseCase {
  private readonly logger = new Logger(FindByPrerequisiteIdUseCase.name);
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(prerequisite_id: string, page: number, limit: number) {
    try {
      const subjectExist =
        await this.subjectRepository.findById(prerequisite_id);

      if (!subjectExist) {
        throw new NotFoundException('Subject not found');
      }

      const { subjects, total } =
        await this.subjectRepository.findByPrerequisiteId(
          prerequisite_id,
          page,
          limit,
        );

      return paginationWrapper<SubjectEntity>(subjects, total, page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
