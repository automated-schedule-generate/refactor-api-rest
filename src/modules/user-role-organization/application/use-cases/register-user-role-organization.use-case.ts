import { Injectable, Logger } from '@nestjs/common';
import { UserRoleOrganizationRepository } from '@repositories';
import { RegisterUserRoleOrganizationDto } from '../dtos/register-user-role-organization.dto';

@Injectable()
export class RegisterUserRoleOrganizationUseCase {
  private readonly logger = new Logger(
    RegisterUserRoleOrganizationUseCase.name,
  );

  constructor(
    private readonly userRoleOrganizationRepository: UserRoleOrganizationRepository,
  ) {}

  async execute(dto: RegisterUserRoleOrganizationDto) {
    try {
      return await this.userRoleOrganizationRepository.register(
        dto.user_id,
        dto.role_id,
        dto.organization_id,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
