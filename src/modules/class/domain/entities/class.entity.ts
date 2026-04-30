import { CourseEntity, SemesterEntity } from '@entities';
import { ShiftEnum } from '@enums';

export class ClassEntity {
  public course: CourseEntity | null = null;
  public semester: SemesterEntity | null = null;

  constructor(
    public readonly id: string,
    public readonly identify: string | null,
    public readonly shift: ShiftEnum,
    public readonly course_semester: number,
    public readonly course_id: string,
    public readonly semester_id: string,
    public readonly is_active: boolean,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}

  toJSON() {
    return {
      ...this,
      course: this.course ? this.course : undefined,
      semester: this.semester ? this.semester : undefined,
    };
  }
}
