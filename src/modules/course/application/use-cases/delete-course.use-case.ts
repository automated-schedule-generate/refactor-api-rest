import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseRepository } from '@repositories';

@Injectable()
export class DeleteCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(id: string): Promise<void> {
    const courseExist = await this.courseRepository.findById(id);

    if (!courseExist) {
      throw new BadRequestException('Course not found');
    }

    await this.courseRepository.delete(id);
  }
}
