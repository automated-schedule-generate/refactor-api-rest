import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from '@repositories';

@Injectable()
export class FindPermissionByIdUseCase {
  private readonly logger = new Logger(FindPermissionByIdUseCase.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: string) {
    try {
      const permission = await this.permissionRepository.findById(id);
      if (!permission) throw new NotFoundException('Permissão não encontrada');
      return permission;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
