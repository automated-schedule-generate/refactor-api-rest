import { SemesterEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { SemesterRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllSemestersUseCase {
  constructor(private readonly semesterRepository: SemesterRepository) {}

  async execute(page: number, limit: number) {
    const { semesters, total } = await this.semesterRepository.findAll(
      page,
      limit,
    );
    return paginationWrapper<SemesterEntity>(semesters, total, page, limit);
  }
}
