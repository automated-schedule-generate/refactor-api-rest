import { SubjectEntity } from '@entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindSubjectByCourseIdUseCase {
  private readonly logger = new Logger(FindSubjectByCourseIdUseCase.name);

  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(course_id: string, page: number, limit: number) {
    try {
      const courseExist = await this.courseRepository.findById(course_id);

      if (!courseExist) {
        throw new NotFoundException('Course not found');
      }

      const { subjects, total } = await this.subjectRepository.findAll(
        { course_id },
        { page, limit },
      );

      return paginationWrapper<SubjectEntity>(subjects, total, page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
