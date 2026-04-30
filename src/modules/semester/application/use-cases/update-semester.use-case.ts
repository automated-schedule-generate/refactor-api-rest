import { UpdateSemesterDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { SemesterRepository } from '@repositories';

@Injectable()
export class UpdateSemesterUseCase {
  constructor(private readonly semesterRepository: SemesterRepository) {}

  async execute(id: string, dto: UpdateSemesterDto) {
    const semester = await this.semesterRepository.update(
      id,
      dto.year,
      dto.semester,
      dto?.is_finished,
    );

    return semester;
  }
}
