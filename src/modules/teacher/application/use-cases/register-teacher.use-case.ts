import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { TeacherRepository, UserRepository } from '@repositories';
import { RegisterTeacherDto } from '../dtos/register-teacher.dto';
import { TeacherEntity } from '@entities';

@Injectable()
export class RegisterTeacherUseCase {
  private readonly logger = new Logger(RegisterTeacherUseCase.name);

  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: RegisterTeacherDto): Promise<TeacherEntity> {
    try {
      const user = await this.userRepository.findById(data.user_id);
      if (!user) {
        throw new BadRequestException('Usuário não encontrado');
      }

      const teacher = await this.teacherRepository.findByUserId(data.user_id);
      if (teacher) {
        throw new BadRequestException('Professor já cadastrado');
      }

      try {
        return await this.teacherRepository.register(
          data.user_id,
          data.special_need,
          data.description_special_need,
          data.observation,
        );
      } catch (error) {
        this.logger.error(error);
        throw new HttpException('Error ao register professor', 500);
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
