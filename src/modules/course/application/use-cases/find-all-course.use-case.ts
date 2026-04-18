import { Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';

@Injectable()
export class FindAllCourseUseCase {
  private readonly logger = new Logger(FindAllCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(page: number, limit: number): Promise<CourseEntity[]> {
    try {
      return await this.courseRepository.findAll(page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
