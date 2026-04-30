import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from '@repositories';

@Injectable()
export class DeleteClassUseCase {
  constructor(private readonly classRepository: ClassRepository) {}

  async execute(id: string) {
    const classExist = await this.classRepository.findById(id);

    if (!classExist) {
      throw new NotFoundException('Turma não encontrada.');
    }

    return await this.classRepository.delete(id);
  }
}
