import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from '@repositories';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

@Injectable()
export class UpdatePermissionUseCase {
  private readonly logger = new Logger(UpdatePermissionUseCase.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: string, dto: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.update(id, dto.path);
      if (!permission) throw new NotFoundException('Permissão não encontrada');
      return permission;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
