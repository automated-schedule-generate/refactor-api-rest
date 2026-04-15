import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { CourseEntity } from '@entities';

@Injectable()
export class FindAllCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(page: number, limit: number): Promise<CourseEntity[]> {
    return await this.courseRepository.findAll(page, limit);
  }
}
