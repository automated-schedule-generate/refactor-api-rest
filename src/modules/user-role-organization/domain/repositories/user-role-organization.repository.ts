import { Injectable } from '@nestjs/common';
import { UserRoleOrganizationEntity } from '@entities';

@Injectable()
export abstract class UserRoleOrganizationRepository {
  abstract register(
    user_id: string,
    role_id: string,
    organization_id: string,
  ): Promise<UserRoleOrganizationEntity>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; entries: UserRoleOrganizationEntity[] }>;
  abstract findByUserId(user_id: string): Promise<UserRoleOrganizationEntity[]>;
  abstract findById(id: string): Promise<UserRoleOrganizationEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}
