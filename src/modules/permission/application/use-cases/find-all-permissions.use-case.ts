import { Injectable, Logger } from '@nestjs/common';
import { PermissionRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { PermissionEntity } from '@entities';

@Injectable()
export class FindAllPermissionsUseCase {
  private readonly logger = new Logger(FindAllPermissionsUseCase.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(page: number, limit: number, search?: string) {
    try {
      const { permissions, total } = await this.permissionRepository.findAll(
        page,
        limit,
        search,
      );
      return paginationWrapper<PermissionEntity>(
        permissions,
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
