import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract create(
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): Promise<UserEntity>;

  abstract update(
    id: string,
    name: string,
    email: string,
    password?: string,
    cpf?: string,
  ): Promise<UserEntity>;

  abstract delete(id: string): Promise<void>;

  abstract findById(id: string): Promise<UserEntity | null>;

  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{
    users: UserEntity[];
    total: number;
  }>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;

  abstract findByCpf(cpf: string): Promise<UserEntity | null>;

  abstract findByIdWithAllData(id: string): Promise<UserEntity | null>;
}
