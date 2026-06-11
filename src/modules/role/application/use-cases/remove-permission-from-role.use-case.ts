import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';

@Injectable()
export class RemovePermissionFromRoleUseCase {
  private readonly logger = new Logger(RemovePermissionFromRoleUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: string, permissionId: string) {
    try {
      const role = await this.roleRepository.removePermission(
        roleId,
        permissionId,
      );
      if (!role) throw new NotFoundException('Papel não encontrado');
      return role;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
