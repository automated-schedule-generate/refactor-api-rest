import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';
import { SubjectEntity } from '@entities';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllSubjectsByCourseIdUseCase {
  private readonly logger = new Logger(FindAllSubjectsByCourseIdUseCase.name);
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(course_id: string) {
    try {
      const courseExist = await this.courseRepository.findById(course_id);

      if (!courseExist) {
        throw new NotFoundException('Course not found');
      }

      const { subjects, total } = await this.subjectRepository.findAll({
        course_id,
      });

      return paginationWrapper<SubjectEntity>(subjects, total);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
