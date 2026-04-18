import { CourseEntity } from '@entities';

export class SubjectEntity {
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
    };
  }
}
