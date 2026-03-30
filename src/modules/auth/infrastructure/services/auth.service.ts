import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { type StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken<T extends object>(payload: T) {
    const expiresIn =
      ms(this.configService.get<StringValue>('jwt.expires_in') || '15m') / 1000;
    const refreshExpiresIn =
      ms(
        this.configService.get<StringValue>('jwt.refresh_expires_in') || '7d',
      ) / 1000;

    return {
      token: await this.jwtService.signAsync(payload as any, {
        expiresIn,
        secret: this.configService.get<string>('jwt.secret'),
      }),
      refresh_token: await this.jwtService.signAsync(payload as any, {
        expiresIn: refreshExpiresIn,
        secret: this.configService.get<string>('jwt.secret'),
      }),
      expires_in: expiresIn,
    };
  }

  async verifyToken<T extends object>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync(token);
  }
}
