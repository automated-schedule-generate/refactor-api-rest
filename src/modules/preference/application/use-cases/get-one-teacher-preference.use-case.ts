import { PreferenceEntity } from '@entities';
import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';

@Injectable()
export class GetOneTeacherPreference {
  private readonly logger = new Logger(GetOneTeacherPreference.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute(userId: string) {
    try {
      const { preference, total } =
        await this.preferenceRepository.findByUserId(userId);
      return paginationWrapper<PreferenceEntity>(preference, total);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
