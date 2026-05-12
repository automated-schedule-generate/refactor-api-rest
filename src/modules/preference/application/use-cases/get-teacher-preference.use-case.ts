import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { PreferenceEntity } from 'src/imports/entities';

@Injectable()
export class GetTeacherPreference {
  private readonly logger = new Logger(GetTeacherPreference.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute() {
    try {
      const { preference, total } = await this.preferenceRepository.find();
      return paginationWrapper<PreferenceEntity>(preference, total);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
