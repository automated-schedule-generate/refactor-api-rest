import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRoleOrganizationRepository } from '@repositories';

@Injectable()
export class DeleteUserRoleOrganizationUseCase {
  private readonly logger = new Logger(DeleteUserRoleOrganizationUseCase.name);

  constructor(
    private readonly userRoleOrganizationRepository: UserRoleOrganizationRepository,
  ) {}

  async execute(id: string) {
    try {
      const deleted = await this.userRoleOrganizationRepository.delete(id);
      if (!deleted)
        throw new NotFoundException(
          'Vínculo usuário-papel-organização não encontrado',
        );
      return { message: 'Vínculo removido com sucesso' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
