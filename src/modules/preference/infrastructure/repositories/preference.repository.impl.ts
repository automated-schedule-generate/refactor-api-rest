import { PreferenceRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PreferenceModel, PreferenceTimeModel } from '@models';
import { Transaction } from 'sequelize';
import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';
import { PreferenceMapper } from '@mappers';
import { PreferenceEntity } from '@entities';

@Injectable()
export class PreferenceRepositoryImpl implements PreferenceRepository {
  constructor(
    @InjectModel(PreferenceModel) private model: typeof PreferenceModel,
  ) {}
  async register(
    userId: string,
    day: DayPreferenceEnum,
    turn: TurnPreferenceEnum,
    transaction?: Transaction,
  ): Promise<PreferenceEntity> {
    const preference = await this.model.create(
      {
        day: day,
        turn: turn,
        user_id: userId,
      },
      { transaction },
    );
    return PreferenceMapper.toEntity(preference.dataValues);
  }

  async findByUserId(
    userId: string,
  ): Promise<{ preference: PreferenceEntity[]; total: number }> {
    const { rows: preference, count: total } = await this.model.findAndCountAll(
      {
        where: { user_id: userId },
        include: [PreferenceTimeModel],
      },
    );
    if (!preference || preference.length === 0) {
      return { preference: [], total: 0 };
    }

    return {
      preference: preference.map((p) =>
        PreferenceMapper.toEntity(p.dataValues),
      ),
      total,
    };
  }

  async find(): Promise<{ preference: PreferenceEntity[]; total: number }> {
    const { rows: preference, count: total } = await this.model.findAndCountAll(
      {
        include: [PreferenceTimeModel],
      },
    );
    return {
      preference: preference.map((p) =>
        PreferenceMapper.toEntity(p.dataValues),
      ),
      total,
    };
  }

  async delete(userId: string): Promise<void> {
    await this.model.destroy({
      where: { user_id: userId },
    });
  }
}
