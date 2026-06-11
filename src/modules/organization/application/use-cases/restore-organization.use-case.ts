import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';

@Injectable()
export class RestoreOrganizationUseCase {
  private readonly logger = new Logger(RestoreOrganizationUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string) {
    try {
      const organization = await this.organizationRepository.restore(id);
      if (!organization)
        throw new NotFoundException('Organização não encontrada');
      return organization;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
