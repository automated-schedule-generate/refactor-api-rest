import { Injectable, Logger } from '@nestjs/common';
import { UserRoleOrganizationRepository } from '@repositories';

@Injectable()
export class FindByUserIdUserRoleOrganizationUseCase {
  private readonly logger = new Logger(
    FindByUserIdUserRoleOrganizationUseCase.name,
  );

  constructor(
    private readonly userRoleOrganizationRepository: UserRoleOrganizationRepository,
  ) {}

  async execute(userId: string) {
    try {
      return await this.userRoleOrganizationRepository.findByUserId(userId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
