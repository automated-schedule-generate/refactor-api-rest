import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';
import { FilterFindAllPreferenceDto } from '../dtos/filter-find-all-preference.dto';
import { preferenceFormat } from 'src/commons/utils/preference-format.util';

@Injectable()
export class GetTeacherPreferenceUseCase {
  private readonly logger = new Logger(GetTeacherPreferenceUseCase.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute(query: FilterFindAllPreferenceDto) {
    try {
      const { preference } = await this.preferenceRepository.find(
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
      return preferenceFormat(preference, true);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
