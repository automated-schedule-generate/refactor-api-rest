import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  private readonly logger = new Logger(UpdateRoleUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string, dto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.update(id, dto.name, dto.priority);
      if (!role) throw new NotFoundException('Papel não encontrado');
      return role;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
