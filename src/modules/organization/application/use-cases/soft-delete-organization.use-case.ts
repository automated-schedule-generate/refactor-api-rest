import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';

@Injectable()
export class SoftDeleteOrganizationUseCase {
  private readonly logger = new Logger(SoftDeleteOrganizationUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string) {
    try {
      const deactivated = await this.organizationRepository.softDelete(id);
      if (!deactivated)
        throw new NotFoundException('Organização não encontrada');
      return { message: 'Organização desativada com sucesso' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
