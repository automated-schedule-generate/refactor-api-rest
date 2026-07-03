import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PreferenceRepository, TeacherRepository } from '@repositories';
import { preferenceFormat } from 'src/commons/utils/preference-format.util';

@Injectable()
export class GetOneTeacherPreferenceUseCase {
  private readonly logger = new Logger(GetOneTeacherPreferenceUseCase.name);
  constructor(
    private readonly preferenceRepository: PreferenceRepository,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(userId: string) {
    const teacherExist = await this.teacherRepository.findByUserId(userId);
    if (!teacherExist) {
      throw new NotFoundException('Professor não encontrado');
    }
    try {
      const { preference } =
        await this.preferenceRepository.findByUserId(userId);
      return preferenceFormat(preference, false);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
