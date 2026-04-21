import { Injectable } from '@nestjs/common';
import { SemesterRepository } from '@repositories';

@Injectable()
export class DeleteSemesterUseCase {
  constructor(private readonly semesterRepository: SemesterRepository) {}

  async execute(id: string) {
    await this.semesterRepository.delete(id);
  }
}
