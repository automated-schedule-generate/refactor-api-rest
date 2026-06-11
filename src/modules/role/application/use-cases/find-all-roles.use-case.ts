import { Injectable, Logger } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { RoleEntity } from '@entities';

@Injectable()
export class FindAllRolesUseCase {
  private readonly logger = new Logger(FindAllRolesUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(page: number, limit: number, search?: string) {
    try {
      const { roles, total } = await this.roleRepository.findAll(
        page,
        limit,
        search,
      );
      return paginationWrapper<RoleEntity>(roles, total, page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
