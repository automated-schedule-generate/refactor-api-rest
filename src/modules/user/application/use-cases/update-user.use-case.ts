import { RegisterUserDto } from '@dtos';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@repositories';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateUserDto: RegisterUserDto) {
    try {
      return await this.userRepository.update(
        id,
        updateUserDto.name,
        updateUserDto.email,
        updateUserDto.password,
        updateUserDto.cpf,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
