import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';

@Injectable()
export class DeleteOrganizationUseCase {
  private readonly logger = new Logger(DeleteOrganizationUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string) {
    try {
      const deleted = await this.organizationRepository.delete(id);
      if (!deleted) throw new NotFoundException('Organização não encontrada');
      return { message: 'Organização removida com sucesso' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
