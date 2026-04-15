import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';

@Injectable()
export class FindByIdCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(id: string): Promise<CourseEntity> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return course;
  }
}
