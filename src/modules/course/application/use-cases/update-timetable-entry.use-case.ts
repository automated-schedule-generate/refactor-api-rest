import { UpdateTimetableEntryDto } from '@dtos';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TimetableEntryRepository } from '@repositories';

@Injectable()
export class UpdateTImetableEntryUseCase {
  private readonly logger = new Logger(UpdateTImetableEntryUseCase.name);

  constructor(
    private readonly timetableEntryRepository: TimetableEntryRepository,
  ) {}

  async execute(id: string, data: UpdateTimetableEntryDto) {
    try {
      const timetableEntryExist =
        await this.timetableEntryRepository.findById(id);

      if (!timetableEntryExist) {
        throw new NotFoundException('Horário não encontrado');
      }

      const timetableEntryConflicts =
        await this.timetableEntryRepository.findConflict(
          data.day,
          data.slot_index,
          data.teacher_id,
          timetableEntryExist.shift,
          data.timetable_id,
        );

      if (timetableEntryConflicts.length > 0) {
        throw new BadRequestException(timetableEntryConflicts, {
          description: 'Conflito de horário detectado!',
        });
      }

      const timetableEntryUpdated = await this.timetableEntryRepository.update(
        id,
        data.day,
        data.slot_index,
        data.teacher_id,
      );

      return timetableEntryUpdated;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
