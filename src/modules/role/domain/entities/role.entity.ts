import { PermissionEntity } from '@entities';

export class RoleEntity {
  public permissions: PermissionEntity[] = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly priority: number,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
