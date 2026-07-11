import { TimetableEntryEntity } from '@entities';
import { ShiftEnum } from '@enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TimetableEntryRepository {
  abstract findById(id: string): Promise<TimetableEntryEntity | null>;

  abstract update(
    id: string,
    day?: string,
    slot_index?: number,
    teacher_id?: string,
  ): Promise<TimetableEntryEntity | null>;

  abstract findConflict(
    day: string,
    slot_index: number,
    teacher_id: string,
    shift: ShiftEnum | null,
    timetable_id: string,
  ): Promise<TimetableEntryEntity[]>;
}
