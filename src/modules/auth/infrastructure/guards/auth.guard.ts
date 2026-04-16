import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@repositories';
import { AuthService } from '@services';
import { FastifyRequest } from 'fastify';
import { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';
import { IS_PUBLIC_KEY } from 'src/commons/metadata/public.metadata';
import { getJwtErrorName } from 'src/commons/utils/jwt-error.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<IAuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: { user_id?: string } =
        await this.authService.verifyToken(token);

      if (!payload?.user_id) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findById(payload.user_id);
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = user;
    } catch (err) {
      const errorName = getJwtErrorName(err);
      if (errorName === 'TokenExpiredError') {
        throw new UnauthorizedException('token_expired');
      }

      if (errorName === 'JsonWebTokenError') {
        throw new UnauthorizedException('invalid_token');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | null {
    const authorization = request?.headers?.authorization;

    if (!authorization) return null;

    const [bearer, token] = authorization.split(' ');
    return bearer === 'Bearer' ? token : null;
  }
}
