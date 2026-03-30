import { LoginDto } from '@dtos';
import { UserEntity } from '@entities';
import { LoginType } from '@enums';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SessionRepository, UserRepository } from '@repositories';
import { AuthService } from '@services';
import { HashUtil } from 'src/commons/utils/hash.util';

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(loginDto: LoginDto) {
    try {
      let user: UserEntity | null = null;
      if (loginDto.login_type === LoginType.EMAIL) {
        user = await this.userRepository.findByEmail(loginDto.login);
      } else if (loginDto.login_type === LoginType.CPF) {
        user = await this.userRepository.findByCpf(loginDto.login);
      }

      if (user === null) {
        throw new BadRequestException('Login ou senha incorretos');
      }

      const isPasswordValid = await HashUtil.compare(
        user.password,
        loginDto.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Login ou senha incorretos');
      }
      const { token, refresh_token, expires_in } =
        await this.authService.generateToken({
          user_id: user.id,
        });

      const session = await this.sessionRepository.register(
        token,
        refresh_token,
        new Date(Date.now() + expires_in * 1000),
      );

      return {
        user,
        session,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
