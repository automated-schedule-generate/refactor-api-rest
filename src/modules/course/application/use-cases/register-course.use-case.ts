import { CourseEntity } from '@entities';
import { Injectable, Logger } from '@nestjs/common';
import { RegisterCourseDto } from '../dtos/register-course.dto';
import { CourseRepository } from '@repositories';

@Injectable()
export class RegisterCourseUseCase {
  private readonly logger = new Logger(RegisterCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(data: RegisterCourseDto): Promise<CourseEntity> {
    try {
      const course = await this.courseRepository.register(
        data.name,
        data.total_semesters,
        data.class_time,
      );
      return course;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
