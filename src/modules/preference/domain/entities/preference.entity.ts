import { PreferenceTimeEntity, TeacherEntity } from '@entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';

export class PreferenceEntity {
  constructor(
    public readonly id: string,
    public readonly day: DayPreferenceEnum,
    public readonly turn: TurnPreferenceEnum,
    public readonly teacher_id: string,
    public preference_times?: PreferenceTimeEntity[],
    public teacher: TeacherEntity | null = null,
  ) {}

  toJSON() {
    return {
      ...this,
      preferenceTimes:
        this.preference_times && this.preference_times.length > 0
          ? this.preference_times
          : undefined,
      teacher: this.teacher ? this.teacher : undefined,
    };
  }
}
