import { Injectable, Logger } from '@nestjs/common';
import { ClassRepository } from '@repositories';
import { FilterFindAllClassDto } from '@dtos';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class FindAllClassUseCase {
  private readonly logger = new Logger(FindAllClassUseCase.name);

  constructor(private readonly classRepository: ClassRepository) {}

  async execute(data: FilterFindAllClassDto) {
    try {
      const { classes, total } = await this.classRepository.findAll(
        data.page,
        data.limit,
        {
          shift: data?.shift,
          course_id: data?.course_id,
          semester_id: data?.semester_id,
        },
      );

      return paginationWrapper(classes, total, data.page, data.limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
