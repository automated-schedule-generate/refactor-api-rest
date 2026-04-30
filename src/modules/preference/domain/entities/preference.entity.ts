import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';

export class PreferenceEntity {
  constructor(
    public readonly id: string,
    public readonly day: DayPreferenceEnum,
    public readonly turn: TurnPreferenceEnum,
    public readonly teacherId: string,
  ) {}
}
