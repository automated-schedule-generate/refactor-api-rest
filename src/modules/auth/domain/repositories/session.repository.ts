import { Injectable } from '@nestjs/common';
import { SessionEntity } from '@entities';

@Injectable()
export abstract class SessionRepository {
  abstract register(
    token: string,
    refresh_token: string,
    expires_at: Date,
  ): Promise<SessionEntity>;
  abstract findByRefreshToken(
    refreshToken: string,
  ): Promise<SessionEntity | null>;
  abstract update(
    sessionId: string,
    updates: Partial<SessionEntity>,
  ): Promise<SessionEntity>;
  abstract delete(session_id: string): Promise<void>;
}
