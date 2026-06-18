import { ShiftEnum } from '@enums';

export class TimetableEntryEntity {
  constructor(
    public readonly id: string,
    public readonly timetable_id: string,
    public readonly course_id: string,
    public readonly course_semester: number,
    public readonly shift: ShiftEnum | null,
    public readonly day: string | null,
    public readonly slot_index: number | null,
    public readonly subject_id: string,
    public readonly teacher_id: string | null,
    public readonly subject_name: string,
    public readonly teacher_name: string | null,
    public readonly is_active: boolean,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
