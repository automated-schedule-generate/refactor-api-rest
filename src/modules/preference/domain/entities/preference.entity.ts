import { PreferenceTimeEntity } from '@entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';

export class PreferenceEntity {
  constructor(
    public readonly id: string,
    public readonly day: DayPreferenceEnum,
    public readonly turn: TurnPreferenceEnum,
    public readonly teacherId: string,
    public preferenceTimes?: PreferenceTimeEntity[],
  ) {}

  toJSON() {
    return {
      ...this,
      preferenceTimes:
        this.preferenceTimes && this.preferenceTimes.length > 0
          ? this.preferenceTimes
          : undefined,
    };
  }
}
