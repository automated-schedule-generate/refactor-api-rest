import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindTimetableBySemesterDto } from '../dtos/find-timetable-by-semester.dto';

import { CourseRepository, SemesterRepository } from 'src/imports/repositories';
import { CourseEntity } from 'src/imports/entities';

@Injectable()
export class FindTimetableBySemesterUseCase {
  private readonly logger = new Logger(FindTimetableBySemesterUseCase.name);

  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async execute(dto: FindTimetableBySemesterDto): Promise<CourseEntity[]> {
    let semester_id: string = '';

    if (dto.semester_id) {
      const semesterExist = await this.semesterRepository.findById(semester_id);

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

    const courses =
      await this.courseRepository.findWithTimetableBySemester(semester_id);

    console.log(courses);

    return courses;
  }
}
