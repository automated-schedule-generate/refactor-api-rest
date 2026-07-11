import { TimetableEntryEntity } from '@entities';
import { ShiftEnum } from '@enums';
import { TimetableEntryMapper } from '@mappers';
import { TimetableEntryModel } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimetableEntryRepository } from '@repositories';

@Injectable()
export class TimetableEntryRepositoryImpl implements TimetableEntryRepository {
  constructor(
    @InjectModel(TimetableEntryModel)
    private readonly timetableEntryModel: typeof TimetableEntryModel,
  ) {}

  async findById(id: string): Promise<TimetableEntryEntity | null> {
    const timetableEntry = await this.timetableEntryModel.findByPk(id);

    if (!timetableEntry?.dataValues) {
      return null;
    }

    return TimetableEntryMapper.toEntity(timetableEntry.dataValues);
  }

  async findConflict(
    day: string,
    slot_index: number,
    teacher_id: string,
    shift: ShiftEnum | null,
    timetable_id: string,
  ): Promise<TimetableEntryEntity[]> {
    const timetableEntries = await this.timetableEntryModel.findAll({
      where: {
        day,
        slot_index,
        teacher_id,
        shift,
        timetable_id,
      },
    });

    return timetableEntries.map((timetableEntry) =>
      TimetableEntryMapper.toEntity(timetableEntry.dataValues),
    );
  }

  async update(
    id: string,
    day?: string,
    slot_index?: number,
    teacher_id?: string,
  ): Promise<TimetableEntryEntity | null> {
    const [, timetableEntry] = await this.timetableEntryModel.update(
      {
        day,
        slot_index,
        teacher_id,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    if (!timetableEntry?.[0]?.dataValues) {
      return null;
    }

    return TimetableEntryMapper.toEntity(timetableEntry[0].dataValues);
  }
}
