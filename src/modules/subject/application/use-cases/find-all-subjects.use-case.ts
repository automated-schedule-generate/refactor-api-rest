import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SubjectRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { FilterFindAllSubjectsDto } from '@dtos';

@Injectable()
export class FindAllSubjectsUseCase {
  private readonly logger = new Logger(FindAllSubjectsUseCase.name);

  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(query: FilterFindAllSubjectsDto) {
    this.logger.log(query);
    try {
      if (query?.course_id && query?.with_course) {
        throw new BadRequestException(
          'Caso esteja passando o parâmetro course_id, não é possível passar o parâmetro with_course como true',
        );
      }

      const { subjects, total } = await this.subjectRepository.findAll(
        {
          course_id: query?.course_id,
          prerequisite_id: query?.prerequisite_id,
          with_course: query?.with_course,
        },
        query?.with_pagination
          ? {
              page: query.page,
              limit: query.limit,
            }
          : undefined,
      );

      return paginationWrapper(subjects, total, query.page, query.limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
