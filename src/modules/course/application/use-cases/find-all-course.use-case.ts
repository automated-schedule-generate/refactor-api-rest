import { Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { FilterFindAllCourseDto } from '@dtos';

@Injectable()
export class FindAllCourseUseCase {
  private readonly logger = new Logger(FindAllCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(query: FilterFindAllCourseDto) {
    try {
      const { courses, total } = await this.courseRepository.findAll(
        query.page,
        query.limit,
        query?.search,
      );

      return paginationWrapper<CourseEntity>(
        courses,
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
