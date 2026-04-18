import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '@repositories';

@Injectable()
export class DeleteTeacherUseCase {
  private readonly logger = new Logger(DeleteTeacherUseCase.name);

  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const teacher = await this.teacherRepository.findByUserId(id);
      if (!teacher) {
        throw new BadRequestException('Professor não encontrado');
      }
      await this.teacherRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
