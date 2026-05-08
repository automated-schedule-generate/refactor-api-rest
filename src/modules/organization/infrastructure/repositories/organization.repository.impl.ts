import { OrganizationRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationModel } from '@models';

@Injectable()
export class OrganizationRepositoryImpl implements OrganizationRepository {
  constructor(
    @InjectModel(OrganizationModel) private model: typeof OrganizationModel,
  ) {}
}
