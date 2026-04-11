import { ClassTimeEnum } from '@enums';

export class CourseEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public total_semesters: number,
    public class_time: ClassTimeEnum,
  ) {}
}
