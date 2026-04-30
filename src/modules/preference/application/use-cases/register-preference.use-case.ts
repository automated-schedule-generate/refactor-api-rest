import { RegisterPreferenceDto } from '@dtos';
import { Injectable, Logger } from '@nestjs/common';
import { PreferenceRepository } from '@repositories';

@Injectable()
export class RegisterPreferenceUseCase {
  constructor(
    private readonly preferenceRepository: PreferenceRepository,
    private readonly logger: Logger,
  ) {}
  async execute(userId: number, dto: RegisterPreferenceDto) {
    try {
      const course = await this.preferenceRepository.register(userId, dto);
      return course;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
