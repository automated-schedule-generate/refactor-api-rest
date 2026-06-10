import { Injectable, Logger } from '@nestjs/common';
import { PermissionRepository } from '@repositories';
import { RegisterPermissionDto } from '../dtos/register-permission.dto';

@Injectable()
export class RegisterPermissionUseCase {
  private readonly logger = new Logger(RegisterPermissionUseCase.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(dto: RegisterPermissionDto) {
    try {
      return await this.permissionRepository.register(dto.path);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
