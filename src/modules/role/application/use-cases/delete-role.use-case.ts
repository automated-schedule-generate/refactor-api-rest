import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';

@Injectable()
export class DeleteRoleUseCase {
  private readonly logger = new Logger(DeleteRoleUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string) {
    try {
      const deleted = await this.roleRepository.delete(id);
      if (!deleted) throw new NotFoundException('Papel não encontrado');
      return { message: 'Papel removido com sucesso' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
