import { TimetableEntryEntity } from '@entities';

export class TimetableEntryMapper {
  static toEntity(model: TimetableEntryEntity): TimetableEntryEntity {
    return new TimetableEntryEntity(
      model.id,
      model.timetable_id,
      model.course_id,
      model.course_semester,
      model.shift,
      model.day,
      model.slot_index,
      model.subject_id,
      model.teacher_id,
      model.subject_name,
      model.teacher_name,
      model.is_active,
      model.created_at,
      model.updated_at,
    );
  }
}
