import { Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllCourseUseCase {
  private readonly logger = new Logger(FindAllCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(page: number, limit: number) {
    try {
      const { courses, total } = await this.courseRepository.findAll(
        page,
        limit,
      );

      return paginationWrapper<CourseEntity>(courses, total, page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
