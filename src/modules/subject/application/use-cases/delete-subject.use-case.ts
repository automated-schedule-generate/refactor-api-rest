import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SubjectRepository } from '@repositories';

@Injectable()
export class DeleteSubjectUseCase {
  private readonly logger = new Logger(DeleteSubjectUseCase.name);

  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(id: string) {
    try {
      const subjectExist = await this.subjectRepository.findById(id);
      if (!subjectExist) {
        throw new NotFoundException('Subject not found');
      }
      await this.subjectRepository.delete(id);
    } catch (error) {
      this.logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
