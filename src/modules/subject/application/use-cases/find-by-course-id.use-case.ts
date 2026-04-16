import { SubjectEntity } from '@entities';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CourseRepository, SubjectRepository } from '@repositories';

@Injectable()
export class FindByCourseIdUseCase {
  private readonly logger = new Logger(FindByCourseIdUseCase.name);

  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async execute(
    course_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]> {
    try {
      const courseExist = await this.courseRepository.findById(course_id);

      if (!courseExist) {
        throw new NotFoundException('Course not found');
      }

      return await this.subjectRepository.findByCourseId(
        course_id,
        page,
        limit,
      );
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
