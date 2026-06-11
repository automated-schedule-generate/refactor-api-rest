import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { AddPermissionToRoleDto } from '../dtos/add-permission-to-role.dto';

@Injectable()
export class AddPermissionToRoleUseCase {
  private readonly logger = new Logger(AddPermissionToRoleUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: string, dto: AddPermissionToRoleDto) {
    try {
      const role = await this.roleRepository.addPermission(
        roleId,
        dto.permission_id,
      );
      if (!role) throw new NotFoundException('Papel não encontrado');
      return role;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
