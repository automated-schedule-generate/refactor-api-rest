import { SemesterEntity, SubjectEntity, TeacherEntity } from '@entities';

export class SubjectTeacherSemesterEntity {
  public subject: SubjectEntity | null = null;
  public teacher: TeacherEntity | null = null;
  public semester: SemesterEntity | null = null;

  constructor(
    public readonly id: string,
    public readonly subject_id: string,
    public readonly teacher_id: string,
    public readonly semester_id: string,
  ) {}
}
