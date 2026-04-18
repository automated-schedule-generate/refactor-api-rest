import { RegisterTeacherSpecialNeedDto } from '@dtos';
import { TeacherEntity } from '@entities';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '@repositories';

@Injectable()
export class UpdateTeacherUseCase {
  private readonly logger = new Logger(UpdateTeacherUseCase.name);

  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(
    id: string,
    data: RegisterTeacherSpecialNeedDto,
  ): Promise<TeacherEntity> {
    try {
      const teacher = await this.teacherRepository.findByUserId(id);
      if (!teacher) {
        throw new BadRequestException('Professor não encontrado');
      }
      const teacherUpdated = await this.teacherRepository.update(
        id,
        data.special_need,
        data?.description_special_need,
        data?.observation,
      );
      if (!teacherUpdated) {
        throw new BadRequestException('Professor não encontrado');
      }
      return teacherUpdated;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
