import { CourseEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { RegisterCourseDto } from '../dtos/register-course.dto';
import { CourseRepository } from '@repositories';

@Injectable()
export class RegisterCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(data: RegisterCourseDto): Promise<CourseEntity> {
    const course = await this.courseRepository.register(
      data.name,
      data.total_semesters,
      data.class_time,
    );
    return course;
  }
}
