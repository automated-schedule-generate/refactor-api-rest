import { PreferenceTimeRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PreferenceTimeModel } from '@models';

@Injectable()
export class PreferenceTimeRepositoryImpl implements PreferenceTimeRepository {
  constructor(
    @InjectModel(PreferenceTimeModel) private model: typeof PreferenceTimeModel,
  ) {}
}
