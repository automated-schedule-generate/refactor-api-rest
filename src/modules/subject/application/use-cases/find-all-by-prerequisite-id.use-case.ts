import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SubjectRepository } from '@repositories';

@Injectable()
export class FindAllByPrerequisiteIdUseCase {
  private readonly logger = new Logger(FindAllByPrerequisiteIdUseCase.name);

  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(prerequisite_id: string) {
    try {
      const subjectExist =
        await this.subjectRepository.findById(prerequisite_id);

      if (!subjectExist) {
        throw new NotFoundException('Prerequisite subject not found');
      }

      return await this.subjectRepository.findAllByPrerequisiteId(
        prerequisite_id,
      );
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
