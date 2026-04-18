import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from '@repositories';

@Injectable()
export class DeleteCourseUseCase {
  private readonly logger = new Logger(DeleteCourseUseCase.name);

  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const courseExist = await this.courseRepository.findById(id);

      if (!courseExist) {
        throw new BadRequestException('Course not found');
      }

      await this.courseRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
