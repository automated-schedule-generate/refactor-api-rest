import { AddCoordinatorDto } from '@dtos';
import { CoordinatorEntity } from '@entities';
import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CoordinatorRepository, TeacherRepository } from '@repositories';
import { DateTime } from 'luxon';

@Injectable()
export class AddCoordinatorUseCase {
  private readonly logger = new Logger(AddCoordinatorDto.name);

  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly coordinatorRepository: CoordinatorRepository,
  ) {}
  async execute(dto: AddCoordinatorDto): Promise<CoordinatorEntity> {
    try {
      const teacher = await this.teacherRepository.findByUserId(dto.user_id);
      if (!teacher) {
        throw new BadGatewayException('Teacher not found');
      }

      const coordinator = await this.coordinatorRepository.findByTeacherId(
        dto.user_id,
      );

      if (coordinator.length === 0) {
        const newCoordinator = await this.coordinatorRepository.create(
          DateTime.fromISO(dto.start_date).toJSDate(),
          dto?.end_date ? DateTime.fromISO(dto.end_date).toJSDate() : null,
          dto.user_id,
        );
        return newCoordinator;
      }
      throw new BadGatewayException('Teacher already has a coordinator');
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
