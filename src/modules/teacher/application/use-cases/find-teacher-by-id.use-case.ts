import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from '../../domain/repositories/teacher.repository';
import { TeacherEntity } from '../../domain/entities/teacher.entity';

@Injectable()
export class FindTeacherByIdUseCase {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(id: string): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findByUserId(id);

    if (!teacher) {
      throw new NotFoundException('Professor não encontrado');
    }

    return teacher;
  }
}
