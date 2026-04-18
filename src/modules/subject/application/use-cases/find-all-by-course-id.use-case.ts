import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';
import { SubjectEntity } from '@entities';

@Injectable()
export class FindAllByCourseIdUseCase {
  private readonly logger = new Logger(FindAllByCourseIdUseCase.name);
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(course_id: string): Promise<SubjectEntity[]> {
    try {
      const courseExist = await this.courseRepository.findById(course_id);

      if (!courseExist) {
        throw new NotFoundException('Course not found');
      }

      return await this.subjectRepository.findAllByCourseId(course_id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
