import { Injectable, Logger } from '@nestjs/common';
import { UserRoleOrganizationRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { UserRoleOrganizationEntity } from '@entities';

@Injectable()
export class FindAllUserRoleOrganizationUseCase {
  private readonly logger = new Logger(FindAllUserRoleOrganizationUseCase.name);

  constructor(
    private readonly userRoleOrganizationRepository: UserRoleOrganizationRepository,
  ) {}

  async execute(page: number, limit: number) {
    try {
      const { entries, total } =
        await this.userRoleOrganizationRepository.findAll(page, limit);
      return paginationWrapper<UserRoleOrganizationEntity>(
        entries,
        total,
        page,
        limit,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
