import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserRepository } from '@repositories';

@Injectable()
export class RegisterUserUseCase {
  private readonly logger = new Logger(RegisterUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerUserDto: RegisterUserDto) {
    try {
      return await this.userRepository.create(
        registerUserDto.name,
        registerUserDto.email,
        registerUserDto.password,
        registerUserDto.cpf,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
