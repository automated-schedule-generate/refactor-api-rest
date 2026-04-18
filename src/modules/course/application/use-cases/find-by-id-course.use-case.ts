import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';

@Injectable()
export class FindByIdCourseUseCase {
  private readonly logger = new Logger(FindByIdCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(id: string): Promise<CourseEntity> {
    try {
      const course = await this.courseRepository.findById(id);

      if (!course) {
        throw new BadRequestException('Course not found');
      }

      return course;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
