import { CourseEntity, TimetableEntryEntity } from '@entities';
import { CourseModel } from '@models';

export class CourseMapper {
  static toEntity(
    model: CourseModel,
    more_data?: { timetable_entries?: TimetableEntryEntity[] },
  ): CourseEntity {
    const course = new CourseEntity(
      model.id,
      model.name,
      model.total_semesters,
      model.class_time,
    );

    if (more_data) {
      if (
        more_data?.timetable_entries &&
        more_data.timetable_entries.length > 0
      ) {
        course.timetable_entries = more_data.timetable_entries;
      }
    }

    return course;
  }
}
