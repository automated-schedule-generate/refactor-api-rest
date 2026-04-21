import { SemesterEnum } from '@enums';

export class SemesterEntity {
  constructor(
    public readonly id: string,
    public readonly year: string,
    public readonly semester: SemesterEnum,
    public readonly is_finished: boolean,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
