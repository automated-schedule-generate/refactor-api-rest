import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UpdateCoordinatorDto } from '../dtos/update-coordinator.dto';
import { CoordinatorRepository, TeacherRepository } from '@repositories';
import { DateTime } from 'luxon';

@Injectable()
export class UpdateCoordinatorUseCase {
  private readonly logger = new Logger(UpdateCoordinatorUseCase.name);

  constructor(
    private readonly coordinatorRepository: CoordinatorRepository,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(id: string, dto: UpdateCoordinatorDto) {
    try {
      const coordinator = await this.coordinatorRepository.findById(id);
      if (!coordinator) {
        throw new BadGatewayException('Coordinator not found');
      }

      const teacher = await this.teacherRepository.findByUserId(dto.user_id);
      if (!teacher) {
        throw new BadGatewayException('Teacher not found');
      }

      const updatedCoordinator = await this.coordinatorRepository.update(
        id,
        DateTime.fromISO(dto.start_date).toJSDate(),
        dto?.end_date ? DateTime.fromISO(dto.end_date).toJSDate() : null,
        dto.user_id,
      );
      return updatedCoordinator;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
