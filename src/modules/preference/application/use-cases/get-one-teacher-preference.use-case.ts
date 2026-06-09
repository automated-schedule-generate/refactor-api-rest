import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';
import { mapPreferenceFormatUtil } from 'src/commons/utils/map-preference-format.util';

@Injectable()
export class GetOneTeacherPreference {
  private readonly logger = new Logger(GetOneTeacherPreference.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute(userId: string) {
    try {
      const { preference } =
        await this.preferenceRepository.findByUserId(userId);
      return mapPreferenceFormatUtil(preference);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
