import { PreferenceTimeRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PreferenceTimeModel } from '@models';
import { Transaction } from 'sequelize';
import { SelectedTimeEnum } from '@enums';
import { PreferenceTimeEntity } from '@entities';
import { PreferenceTimeMapper } from '@mappers';

@Injectable()
export class PreferenceTimeRepositoryImpl implements PreferenceTimeRepository {
  constructor(
    @InjectModel(PreferenceTimeModel) private model: typeof PreferenceTimeModel,
  ) {}
  async register(
    preferenceId: string,
    selected: SelectedTimeEnum,
    transaction: Transaction,
  ): Promise<PreferenceTimeEntity> {
    const preferenceTime = await this.model.create(
      {
        preference_id: preferenceId,
        selected: selected,
      },
      { transaction },
    );
    return PreferenceTimeMapper.toEntity(preferenceTime.dataValues);
  }
}
