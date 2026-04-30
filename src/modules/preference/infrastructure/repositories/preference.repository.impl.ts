import { PreferenceRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PreferenceModel } from '@models';
import { PreferenceEntity } from '@entities';

@Injectable()
export class PreferenceRepositoryImpl implements PreferenceRepository {
  constructor(
    @InjectModel(PreferenceModel) private model: typeof PreferenceModel,
  ) {}
  register(): Promise<PreferenceEntity> {
    throw new Error('Method not implemented.');
  }
}
