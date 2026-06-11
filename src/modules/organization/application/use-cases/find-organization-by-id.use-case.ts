import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';

@Injectable()
export class FindOrganizationByIdUseCase {
  private readonly logger = new Logger(FindOrganizationByIdUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string) {
    try {
      const organization = await this.organizationRepository.findById(id);
      if (!organization)
        throw new NotFoundException('Organização não encontrada');
      return organization;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
