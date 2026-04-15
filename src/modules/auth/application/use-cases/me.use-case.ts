import { UserEntity } from '@entities';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@repositories';

@Injectable()
export class MeUseCase {
  private readonly logger = new Logger(MeUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(user_id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByIdWithAllData(user_id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
