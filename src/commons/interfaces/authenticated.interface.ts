import { UserEntity } from '@entities';
import { FastifyRequest } from 'fastify';

export interface IAuthenticatedRequest extends FastifyRequest {
  user: UserEntity;
}
