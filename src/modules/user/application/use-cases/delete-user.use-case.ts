import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@repositories';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
