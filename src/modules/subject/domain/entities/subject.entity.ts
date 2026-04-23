import { CourseEntity, SemesterEntity, TeacherEntity } from '@entities';

export class SubjectEntity {
  public teachers: TeacherEntity[] = [];
  public semesters: SemesterEntity[] = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly workload: number,
    public readonly is_optional: boolean,
    public readonly prerequisite_id: string,
    public readonly course_id: string,
    public prerequisite: SubjectEntity | null = null,
    public course: CourseEntity | null = null,
  ) {}

  toJSON() {
    return {
      ...this,
      prerequisite: this.prerequisite === null ? undefined : this.prerequisite,
      course: this.course === null ? undefined : this.course,
      teachers: this.teachers?.length > 0 ? this.teachers : undefined,
      semesters: this.semesters?.length > 0 ? this.semesters : undefined,
    };
  }
}
