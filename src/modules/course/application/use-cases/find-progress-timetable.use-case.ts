import { Injectable } from '@nestjs/common';
import { TimetableService } from '@services';
import { SemesterRepository } from '@repositories';
import { DomainException } from '@commons/exceptions/domain-exception';

@Injectable()
export class FindProgressTimetableUseCase {
  constructor(
    private readonly timetableService: TimetableService,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async execute() {
    const semester = await this.semesterRepository.findCurrentSemester();

    if (!semester) {
      throw new DomainException(
        'Nenhum semestre ativo encontrado.',
        'SEMESTER_NOT_FOUND',
      );
    }

    const progress = await this.timetableService.getProgress(semester.id);

    return progress;
  }
}
