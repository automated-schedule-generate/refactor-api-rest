import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterCourseDto } from '@dtos';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';

@Injectable()
export class UpdateCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(id: string, data: RegisterCourseDto): Promise<CourseEntity> {
    const courseExist = await this.courseRepository.findById(id);

    if (!courseExist) {
      throw new BadRequestException('Course not found');
    }

    const courseUpdated = await this.courseRepository.update(
      id,
      data.name,
      data.total_semesters,
      data.class_time,
    );

    if (!courseUpdated) {
      throw new BadRequestException('Course not updated');
    }

    return courseUpdated;
  }
}
