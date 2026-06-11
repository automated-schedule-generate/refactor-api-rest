import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@repositories';

@Injectable()
export class FindRoleByIdUseCase {
  private readonly logger = new Logger(FindRoleByIdUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string) {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) throw new NotFoundException('Papel não encontrado');
      return role;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
