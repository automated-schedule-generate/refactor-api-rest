import { AuthEntity } from '@entities';
import { AuthModel } from '@models';

export class AuthMapper {
  static toEntity(model: AuthModel): AuthEntity {
    return new AuthEntity();
  }
}
