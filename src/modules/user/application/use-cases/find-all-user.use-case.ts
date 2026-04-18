import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@repositories';
import { paginationWrapper } from 'src/commons/wrappers/pagination.wrapper';
import { UserEntity } from '@entities';

@Injectable()
export class FindAllUserUseCase {
  private readonly logger = new Logger(FindAllUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number, limit: number) {
    try {
      const { users, total } = await this.userRepository.findAll(page, limit);
      return paginationWrapper<UserEntity>(users, total, page, limit);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
