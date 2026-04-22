import { RegisterSemesterDto } from '@dtos';
import { SemesterEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { SemesterRepository } from '@repositories';

@Injectable()
export class RegisterSemesterUseCase {
  constructor(private readonly semesterRepository: SemesterRepository) {}

  async execute(dto: RegisterSemesterDto): Promise<SemesterEntity> {
    const semester = await this.semesterRepository.register(
      dto.year,
      dto.semester,
    );

    return semester;
  }
}
