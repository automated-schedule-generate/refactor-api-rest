import { Injectable, Logger } from '@nestjs/common';
import { OrganizationRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { OrganizationEntity } from '@entities';

@Injectable()
export class FindAllOrganizationsUseCase {
  private readonly logger = new Logger(FindAllOrganizationsUseCase.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(page: number, limit: number, search?: string) {
    try {
      const { organizations, total } =
        await this.organizationRepository.findAll(page, limit, search);
      return paginationWrapper<OrganizationEntity>(
        organizations,
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
