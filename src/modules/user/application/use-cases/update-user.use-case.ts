import { UpdateUserDto } from '@dtos';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@repositories';
import { HashUtil } from 'src/commons/utils/hash.util';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    try {
      const password = updateUserDto?.password
        ? await HashUtil.hash(updateUserDto.password)
        : undefined;
      return await this.userRepository.update(
        id,
        updateUserDto.name,
        updateUserDto.email,
        password,
        updateUserDto?.cpf,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
