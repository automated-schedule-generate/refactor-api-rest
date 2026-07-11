import { CourseEntity, TimetableEntryEntity } from 'src/imports/entities';
import { ClassTimeEnum } from 'src/imports/enums';

export function FormatedTimetableUtil(
  course: CourseEntity,
  all_semesters: boolean = true,
) {
  const formated: (TimetableEntryEntity | null)[][][] = [];
  const quantity_row = course.class_time === ClassTimeEnum.MIN_45 ? 6 : 5;

  const max_semester = all_semesters ? course.total_semesters : 1;

  for (let i = 0; i < max_semester; i++) {
    formated.push([]);
    for (let j = 0; j < quantity_row; j++) {
      formated[i].push([]);
      for (let z = 0; z < 5; z++) {
        formated[i][j].push(null);
      }
    }
  }

  const unassigned: (TimetableEntryEntity | null)[] = [];

  for (const timetable of course.timetable_entries) {
    if (timetable.course_semester === -1) {
      unassigned.push(timetable);
      continue;
    }

    if (timetable.day === null || timetable.slot_index === null) {
      unassigned.push(timetable);
      continue;
    }

    formated[timetable.course_semester - 1][timetable.slot_index][
      Number(timetable.day)
    ] = timetable;
  }

  return {
    formated,
    unassigned,
  };
}
