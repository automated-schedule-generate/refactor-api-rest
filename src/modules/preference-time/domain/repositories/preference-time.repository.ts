import { PreferenceTimeEntity } from '@entities';
import { SelectedTimeEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export abstract class PreferenceTimeRepository {
  abstract register(
    preferenceId: string,
    selected: SelectedTimeEnum,
    transaction?: Transaction,
  ): Promise<PreferenceTimeEntity>;
}
