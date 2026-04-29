import { UpdateClassDto } from '@dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ClassRepository,
  CourseRepository,
  SemesterRepository,
} from '@repositories';

@Injectable()
export class UpdateClassUseCase {
  constructor(
    private readonly classRepository: ClassRepository,
    private readonly courseRepository: CourseRepository,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async execute(id: string, data: UpdateClassDto) {
    const courseExist = await this.courseRepository.findById(data.course_id);

    if (!courseExist) {
      throw new NotFoundException('Curso não encontrado.');
    }

    const semesterExist = await this.semesterRepository.findById(
      data.semester_id,
    );

    if (!semesterExist) {
      throw new NotFoundException('Semestre não encontrado.');
    }

    return await this.classRepository.update(
      id,
      data?.identify ?? null,
      data.shift,
      data.course_semester,
      data.course_id,
      data.semester_id,
    );
  }
}
