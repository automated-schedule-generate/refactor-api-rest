import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from '@repositories';

@Injectable()
export class DeletePermissionUseCase {
  private readonly logger = new Logger(DeletePermissionUseCase.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: string) {
    try {
      const deleted = await this.permissionRepository.delete(id);
      if (!deleted) throw new NotFoundException('Permissão não encontrada');
      return { message: 'Permissão removida com sucesso' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
