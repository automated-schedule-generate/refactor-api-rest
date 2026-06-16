import { ClassTimeEnum } from '@enums';
import { TimetableEntryEntity } from '@entities';

export class CourseEntity {
  public timetable_entries: TimetableEntryEntity[] = [];
  constructor(
    public readonly id: string,
    public name: string,
    public total_semesters: number,
    public class_time: ClassTimeEnum,
  ) {}
}
