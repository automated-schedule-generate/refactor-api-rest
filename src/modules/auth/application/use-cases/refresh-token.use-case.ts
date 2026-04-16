import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getJwtErrorName } from 'src/commons/utils/jwt-error.util';
import { SessionRepository } from '@repositories';
import { AuthService } from '@services';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(refreshToken: string) {
    let payload;
    try {
      payload = await this.authService.verifyToken<{
        user_id: string;
      }>(refreshToken);
    } catch (err) {
      const errorName = getJwtErrorName(err);
      if (errorName === 'TokenExpiredError') {
        const session =
          await this.sessionRepository.findByRefreshToken(refreshToken);

        if (session) {
          await this.sessionRepository.delete(session.id);
        }

        throw new UnauthorizedException('RefreshTokenExpiredError');
      }

      if (errorName === 'JsonWebTokenError') {
        throw new UnauthorizedException('invalid_refresh_token');
      }

      throw new UnauthorizedException();
    }

    const session =
      await this.sessionRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException('session_not_found');
    }

    const { token, expires_in } = await this.authService.generateToken({
      user_id: payload.user_id,
    });

    await this.sessionRepository.update(session.id, { token });

    return { token, expires_in };
  }
}
