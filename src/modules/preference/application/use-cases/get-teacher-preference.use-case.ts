import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';

@Injectable()
export class GetTeacherPreference {
  private readonly logger = new Logger(GetTeacherPreference.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute() {
    try {
      const { preference, total } = await this.preferenceRepository.find();
      return { preference, total };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
