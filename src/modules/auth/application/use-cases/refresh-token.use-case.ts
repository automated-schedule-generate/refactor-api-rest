import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { getJwtErrorName } from 'src/commons/utils/jwt-error.util';
import { SessionRepository } from '@repositories';
import { AuthService } from '@services';

@Injectable()
export class RefreshTokenUseCase {
  private readonly logger = new Logger(RefreshTokenUseCase.name);
  constructor(
    private readonly authService: AuthService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(refreshToken: string) {
    try {
      const payload = await this.authService
        .verifyToken<{ user_id: string }>(refreshToken)
        .catch(async (err) => {
          const errorName = getJwtErrorName(err);

          if (errorName === 'TokenExpiredError') {
            await this.sessionRepository.deleteByRefreshToken(refreshToken);
            throw new UnauthorizedException('refresh_token_expired');
          }

          if (errorName === 'JsonWebTokenError') {
            throw new UnauthorizedException('invalid_refresh_token');
          }

          throw new UnauthorizedException();
        });

      const session =
        await this.sessionRepository.findByRefreshToken(refreshToken);

      if (!session) {
        throw new UnauthorizedException('session_not_found');
      }

      const { token, refresh_token, expires_in } =
        await this.authService.generateToken({
          user_id: payload.user_id,
        });

      await this.sessionRepository.update(session.id, {
        token,
        refresh_token,
      });

      return { token, refresh_token, expires_in };
    } catch (error) {
      console.log(error);
      this.logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
