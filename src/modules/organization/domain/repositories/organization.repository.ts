import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from '../entities/organization.entity.ts';

@Injectable()
export abstract class OrganizationRepository {
  abstract register(name: string, user_id: string): Promise<OrganizationEntity>;
  abstract findAll(): Promise<OrganizationEntity[]>;
  abstract findById(id: string): Promise<OrganizationEntity>;
  abstract update(id: string, name: string, user_id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract restore(id: string): Promise<void>;
}
