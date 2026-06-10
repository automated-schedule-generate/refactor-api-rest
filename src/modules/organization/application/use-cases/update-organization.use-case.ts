import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';

@Injectable()
export class UpdateOrganizationUseCase {
  private readonly logger = new Logger(UpdateOrganizationUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string, dto: UpdateOrganizationDto) {
    try {
      const organization = await this.organizationRepository.update(
        id,
        dto.name,
        dto.user_id,
      );
      if (!organization)
        throw new NotFoundException('Organização não encontrada');
      return organization;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
