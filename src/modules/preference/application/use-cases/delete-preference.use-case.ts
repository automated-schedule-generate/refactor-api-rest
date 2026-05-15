import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';

@Injectable()
export class DeletePreferenceUseCase {
  private readonly logger: Logger = new Logger(DeletePreferenceUseCase.name);
  constructor(private readonly preferenceRepository: PreferenceRepository) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.preferenceRepository.delete(userId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
