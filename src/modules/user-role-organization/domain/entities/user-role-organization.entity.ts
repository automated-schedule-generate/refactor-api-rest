import { OrganizationEntity, RoleEntity, UserEntity } from '@entities';

export class UserRoleOrganizationEntity {
  public user: UserEntity | null = null;
  public role: RoleEntity | null = null;
  public organization: OrganizationEntity | null = null;

  constructor(
    public readonly id: string,
    public readonly user_id: string,
    public readonly role_id: string,
    public readonly organization_id: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
