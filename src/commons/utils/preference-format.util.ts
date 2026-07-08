import { PreferenceEntity } from 'src/imports/entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from 'src/imports/enums';

type GroupedPreference = {
  teacher_id: string;
  preferences: {
    turn: TurnPreferenceEnum;
    preference: boolean[][];
  }[];
};

export function preferenceFormat(
  preference: PreferenceEntity[],
  group_by_teacher: boolean = false,
) {
  if (group_by_teacher) {
    const grouped = preference.reduce<Record<string, PreferenceEntity[]>>(
      (acc, pref) => {
        const key = pref.teacher_id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(pref);
        return acc;
      },
      {},
    );

    return Object.entries(grouped).map(
      ([teacher_id, prefs]): GroupedPreference => ({
        teacher_id,
        ...(preferenceFormat(prefs) as {
          preferences: { turn: TurnPreferenceEnum; preference: boolean[][] }[];
        }),
      }),
    );
  }

  // resto do código existente...
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
      if (day?.preference_times) {
        day.preference_times.forEach((pt) => {
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
