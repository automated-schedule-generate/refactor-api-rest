import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserRepository } from '@repositories';
import { HashUtil } from 'src/commons/utils/hash.util';

@Injectable()
export class RegisterUserUseCase {
  private readonly logger = new Logger(RegisterUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerUserDto: RegisterUserDto) {
    try {
      const user = await this.userRepository.findByEmail(registerUserDto.email);
      if (user) {
        throw new BadGatewayException('Email ou CPF já cadastrado');
      }

      const cpf = await this.userRepository.findByCpf(registerUserDto.cpf);
      if (cpf) {
        throw new BadGatewayException('Email ou CPF já cadastrado');
      }

      return await this.userRepository.create(
        registerUserDto.name,
        registerUserDto.email,
        await HashUtil.hash(registerUserDto.password),
        registerUserDto.cpf,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
