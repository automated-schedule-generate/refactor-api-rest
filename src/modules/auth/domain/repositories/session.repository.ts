import { Injectable } from '@nestjs/common';
import { SessionEntity } from '@entities';

@Injectable()
export abstract class SessionRepository {
  abstract register(
    token: string,
    refresh_token: string,
    expires_at: Date,
  ): Promise<SessionEntity>;
}
