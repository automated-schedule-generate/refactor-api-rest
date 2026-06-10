import { Injectable, Logger } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';
import { RegisterOrganizationDto } from '../dtos/register-organization.dto';

@Injectable()
export class RegisterOrganizationUseCase {
  private readonly logger = new Logger(RegisterOrganizationUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(dto: RegisterOrganizationDto) {
    try {
      return await this.organizationRepository.register(dto.name, dto.user_id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
