import { PreferenceEntity } from 'src/imports/entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from 'src/imports/enums';

export function preferenceFormat(preference: PreferenceEntity[]) {
  if (!preference || preference.length === 0) {
    return {
      preferences: [
        {
          turn: 'morning',
          preference: Array(5).fill(Array(6).fill(false)),
        },
        {
          turn: 'afternoon',
          preference: Array(5).fill(Array(6).fill(false)),
        },
      ],
    };
  }

  const buildPreferenceGrid = (filtered: PreferenceEntity[]): boolean[][] => {
    return Array.from({ length: 5 }, (_, dayIndex) => {
      const day = filtered.find(
        (p) => p.day === (String(dayIndex) as DayPreferenceEnum),
      );
      const grid: boolean[] = Array(6).fill(false) as boolean[];
      if (day?.preferenceTimes) {
        day.preferenceTimes.forEach((pt) => {
          grid[Number(pt.selected_time)] = true;
        });
      }
      return grid;
    });
  };

  const morningPreferences = preference.filter(
    (p) => p.turn === TurnPreferenceEnum.MORNING,
  );
  const afternoonPreferences = preference.filter(
    (p) => p.turn === TurnPreferenceEnum.AFTERNOON,
  );

  return {
    preferences: [
      {
        turn: TurnPreferenceEnum.MORNING,
        preference: buildPreferenceGrid(morningPreferences),
      },
      {
        turn: TurnPreferenceEnum.AFTERNOON,
        preference: buildPreferenceGrid(afternoonPreferences),
      },
    ],
  };
}
