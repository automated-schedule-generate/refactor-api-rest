import { PreferenceTimeEntity, TeacherEntity } from '@entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';

export class PreferenceEntity {
  constructor(
    public readonly id: string,
    public readonly day: DayPreferenceEnum,
    public readonly turn: TurnPreferenceEnum,
    public readonly teacher_id: string,
    public preferenceTimes?: PreferenceTimeEntity[],
    public teacher: TeacherEntity | null = null,
  ) {}

  toJSON() {
    return {
      ...this,
      preferenceTimes:
        this.preferenceTimes && this.preferenceTimes.length > 0
          ? this.preferenceTimes
          : undefined,
      teacher: this.teacher ? this.teacher : undefined,
    };
  }
}
