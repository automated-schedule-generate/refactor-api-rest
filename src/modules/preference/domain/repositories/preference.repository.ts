import { PreferenceEntity } from '@entities';
import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export abstract class PreferenceRepository {
  abstract register(
    userId: string,
    day: DayPreferenceEnum,
    turn: TurnPreferenceEnum,
    transaction?: Transaction,
  ): Promise<PreferenceEntity>;
  abstract findByUserId(
    userId: string,
  ): Promise<{ preference: PreferenceEntity[]; total: number }>;
  abstract find(): Promise<{ preference: PreferenceEntity[]; total: number }>;
  abstract delete(userId: string): Promise<void>;
}
