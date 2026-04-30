import { FilterFindAllTeachersDto } from '@dtos';
import { TeacherEntity } from '@entities';
import { Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllTeachersUseCase {
  private readonly logger = new Logger(FindAllTeachersUseCase.name);

  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(query: FilterFindAllTeachersDto) {
    try {
      const { teachers, total } = await this.teacherRepository.findAll(
        query.page,
        query.limit,
        query?.search,
      );

      return paginationWrapper<TeacherEntity>(
        teachers,
        total,
        query.page,
        query.limit,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
