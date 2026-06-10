import { Injectable } from '@nestjs/common';
import { RoleEntity } from '@entities';

@Injectable()
export abstract class RoleRepository {
  abstract register(name: string, priority: number): Promise<RoleEntity>;
  abstract findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ total: number; roles: RoleEntity[] }>;
  abstract findById(id: string): Promise<RoleEntity | null>;
  abstract update(
    id: string,
    name: string,
    priority: number,
  ): Promise<RoleEntity | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract addPermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity | null>;
  abstract removePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleEntity | null>;
}
