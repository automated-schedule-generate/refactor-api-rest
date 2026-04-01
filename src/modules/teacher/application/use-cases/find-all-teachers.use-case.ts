import { TeacherEntity } from '@entities';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '@repositories';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@Injectable()
export class FindAllTeachersUseCase {
  private readonly logger = new Logger(FindAllTeachersUseCase.name);

  constructor(private readonly teacherRepository: TeacherRepository) {}

  async execute(query: PaginationDto): Promise<TeacherEntity[]> {
    try {
      return await this.teacherRepository.findAll(query.page, query.limit);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Error ao buscar professores', 500);
    }
  }
}
