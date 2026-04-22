import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SemesterRepository } from '@repositories';

@Injectable()
export class ChangeIsFinishedUseCase {
  constructor(private readonly semesterRepository: SemesterRepository) {}

  async execute(id: string) {
    const semester = await this.semesterRepository.findById(id);

    if (!semester) {
      throw new NotFoundException('Semester not found');
    }

    const semesterUpdated = await this.semesterRepository.update(
      id,
      semester.year,
      semester.semester,
      !semester.is_finished,
    );

    if (!semesterUpdated) {
      throw new InternalServerErrorException('Failed to update semester');
    }

    return semesterUpdated;
  }
}
