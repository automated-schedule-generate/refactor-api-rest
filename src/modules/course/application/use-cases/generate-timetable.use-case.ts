import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CourseRepository } from '@repositories';
import { TimetableService } from '@services';
import { isAxiosError } from 'axios';

@Injectable()
export class GenerateTimetableUseCase {
  private readonly logger = new Logger(GenerateTimetableUseCase.name);

  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly timetableService: TimetableService,
  ) {}

  async execute() {
    try {
      //limit 1000 pois preciso de todos os cursos para gerar o horario
      const { courses } = await this.courseRepository.findAll(1, 1000);

      void this.timetableService.generate(courses.map((course) => course.id));

      return {
        message: 'Iniciando processo de geração de horários',
        data: {
          courses_amount: courses.length,
        },
      };
    } catch (error) {
      this.logger.error(error);

      if (isAxiosError(error)) {
        throw new InternalServerErrorException(
          'Não foi possível comunicar com o servidor de horários',
        );
      }
      throw error;
    }
  }
}
