import { SessionRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SessionModel } from '@models';
import { SessionMapper } from '@mappers';
import { SessionEntity } from '@entities';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(@InjectModel(SessionModel) private model: typeof SessionModel) {}

  async register(
    token: string,
    refresh_token: string,
    expires_at: Date,
  ): Promise<SessionEntity> {
    const session = await this.model.create({
      token,
      refresh_token,
      expires_at,
    });

    return SessionMapper.toEntity(session.dataValues);
  }

  async findByRefreshToken(
    refreshToken: string,
  ): Promise<SessionEntity | null> {
    const session = await this.model.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!session) {
      return null;
    }

    return SessionMapper.toEntity(session.dataValues);
  }

  async update(
    sessionId: string,
    updates: Partial<SessionEntity>,
  ): Promise<SessionEntity> {
    const session = await this.model.findByPk(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    await session.update(updates);
    return SessionMapper.toEntity(session.dataValues);
  }

  async delete(session_id: string): Promise<void> {
    const session = await this.model.findByPk(session_id);
    if (!session) {
      throw new Error('Session not found');
    }
  }
}
