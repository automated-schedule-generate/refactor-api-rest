import { TimetableEntryEntity } from '@entities';

export class TimetableEntity {
  entries: TimetableEntryEntity[] = [];

  constructor(
    public readonly id: string,
    public readonly semester_id: string,
    public readonly course_ids: string[],
    public readonly fitness_score: number,
    public readonly generation_count: number,
    public readonly generated_at: Date,
    public readonly is_active: boolean,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
