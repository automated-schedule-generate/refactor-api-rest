import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { PreferenceEntity } from 'src/imports/entities';
import { FilterFindAllPreferenceDto } from '../dtos/filter-find-all-preference.dto';

@Injectable()
export class GetTeacherPreferenceUseCase {
  private readonly logger = new Logger(GetTeacherPreferenceUseCase.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute(query: FilterFindAllPreferenceDto) {
    try {
      const { preference, total } = await this.preferenceRepository.find(
        {
          teacher_id: query.teacher_id,
        },
        query?.with_pagination
          ? {
              page: query.page,
              limit: query.limit,
            }
          : undefined,
      );
      return paginationWrapper<PreferenceEntity>(preference, total);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
