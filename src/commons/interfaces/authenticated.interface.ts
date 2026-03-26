import { UserEntity } from '@entities';

export interface IAuthenticated extends Request {
  user: UserEntity;
}
