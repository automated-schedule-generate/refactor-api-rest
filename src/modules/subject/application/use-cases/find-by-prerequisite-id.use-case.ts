import { SubjectEntity } from '@entities';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SubjectRepository } from '@repositories';

@Injectable()
export class FindByPrerequisiteIdUseCase {
  private readonly logger = new Logger(FindByPrerequisiteIdUseCase.name);
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async execute(
    prerequisite_id: string,
    page: number,
    limit: number,
  ): Promise<SubjectEntity[]> {
    try {
      const subjectExist =
        await this.subjectRepository.findById(prerequisite_id);

      if (!subjectExist) {
        throw new NotFoundException('Subject not found');
      }

      return await this.subjectRepository.findByPrerequisiteId(
        prerequisite_id,
        page,
        limit,
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
