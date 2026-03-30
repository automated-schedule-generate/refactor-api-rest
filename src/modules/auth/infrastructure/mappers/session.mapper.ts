import { SessionEntity } from '@entities';
import { SessionModel } from '@models';

export class SessionMapper {
  static toEntity(model: SessionModel): SessionEntity {
    return new SessionEntity(
      model.id,
      model.token,
      model.refresh_token,
      model.expires_at,
    );
  }
}
