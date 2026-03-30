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
}
