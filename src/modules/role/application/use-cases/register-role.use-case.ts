import { Injectable, Logger } from '@nestjs/common';
import { RoleRepository } from '@repositories';
import { RegisterRoleDto } from '../dtos/register-role.dto';

@Injectable()
export class RegisterRoleUseCase {
  private readonly logger = new Logger(RegisterRoleUseCase.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(dto: RegisterRoleDto) {
    try {
      return await this.roleRepository.register(dto.name, dto.priority);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
