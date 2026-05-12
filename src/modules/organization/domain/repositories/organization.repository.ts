import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from '../entities/organization.entity.ts';

@Injectable()
export abstract class OrganizationRepository {
  abstract register(name: string, user_id: string): Promise<OrganizationEntity>;
  abstract findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    total: number;
    organizations: OrganizationEntity[];
  }>;
  abstract findById(id: string): Promise<OrganizationEntity | null>;
  abstract update(
    id: string,
    name: string,
    user_id: string,
  ): Promise<OrganizationEntity | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract restore(id: string): Promise<OrganizationEntity | null>;
}
