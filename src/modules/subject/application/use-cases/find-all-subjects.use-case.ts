import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllSubjectsUseCase {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(page: number, limit: number) {
    const { subjects, total } = await this.subjectRepository.findAll(
      {},
      { page, limit },
    );

    return paginationWrapper(subjects, total, page, limit);
  }
}
