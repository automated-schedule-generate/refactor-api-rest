import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindTimetableBySemesterDto } from '../dtos/find-timetable-by-semester.dto';

import { CourseRepository, SemesterRepository } from 'src/imports/repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { FormatedTimetableUtil } from '../../infrastructure/utils/formated-timetable.util';

@Injectable()
export class FindTimetableUseCase {
  private readonly logger = new Logger(FindTimetableUseCase.name);

  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async execute(dto: FindTimetableBySemesterDto) {
    try {
      let semester_id: string = '';

      if (dto.semester_id) {
        const semesterExist =
          await this.semesterRepository.findById(semester_id);

        if (!semesterExist) {
          throw new BadRequestException('Semester not found');
        }

        semester_id = dto.semester_id;
      } else {
        const semester = await this.semesterRepository.findCurrentSemester();

        if (!semester) {
          throw new BadRequestException(
            'There is no active semester to search the timetable',
          );
        }

        semester_id = semester.id;
      }

      const { courses, total } = await this.courseRepository.findWithTimetable(
        semester_id,
        dto?.course_id,
      );

      return paginationWrapper(
        courses.map((course) => {
          const { formated, unassigned } = FormatedTimetableUtil(course);

          return {
            ...course,
            timetable_entries: formated,
            unassigned,
          };
        }),
        total,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
