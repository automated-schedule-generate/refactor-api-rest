import { Injectable } from '@nestjs/common';
import { PermissionEntity } from '@entities';

@Injectable()
export abstract class PermissionRepository {
  abstract register(path: string): Promise<PermissionEntity>;
  abstract findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ total: number; permissions: PermissionEntity[] }>;
  abstract findById(id: string): Promise<PermissionEntity | null>;
  abstract update(id: string, path: string): Promise<PermissionEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}
