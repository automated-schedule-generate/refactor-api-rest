import { RegisterTeacherSpecialNeedDto } from '@dtos';
import { TeacherEntity } from '@entities';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
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
      let teacherUpdated: TeacherEntity | null = null;
      try {
        teacherUpdated = await this.teacherRepository.update(
          id,
          data.special_need,
          data?.description_special_need,
          data?.observation,
        );
      } catch (error) {
        this.logger.error(error);
        throw new HttpException('Error ao atualizar professor', 500);
      }
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
