import { RegisterPreferenceDto } from '@dtos';
import { PreferenceEntity, PreferenceTimeEntity } from '@entities';
import { DayPreferenceEnum, SelectedTimeEnum } from '@enums';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  PreferenceRepository,
  PreferenceTimeRepository,
  TeacherRepository,
} from '@repositories';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UpdatePreferenceUseCase {
  private readonly logger: Logger = new Logger(UpdatePreferenceUseCase.name);
  constructor(
    private readonly preferenceRepository: PreferenceRepository,
    private readonly preferenceTimeRepository: PreferenceTimeRepository,
    private readonly sequelize: Sequelize,
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async execute(userId: string, dto: RegisterPreferenceDto) {
    const teacherExist = await this.teacherRepository.findByUserId(userId);
    if (!teacherExist) {
      throw new NotFoundException('Professor não encontrado');
    }

    const transaction = await this.sequelize.transaction();
    const preferences: PreferenceEntity[] = [];
    try {
      await this.preferenceRepository.delete(userId);
      for (const pref of dto.preferences) {
        for (let i = 0; i < pref.preference.length; i++) {
          const preferenceTime = pref.preference[i];
          const day = String(i) as DayPreferenceEnum;
          const turn = pref.turn;
          const preference = await this.preferenceRepository.register(
            userId,
            day,
            turn,
            transaction,
          );
          if (!preferenceTime.length) continue;

          const preferenceTimes: PreferenceTimeEntity[] = [];
          for (let j = 0; j < preferenceTime.length; j++) {
            const selectedValue = preferenceTime[j];
            if (selectedValue === true) {
              const selected = String(j) as SelectedTimeEnum;
              const createdPreferenceTime =
                await this.preferenceTimeRepository.register(
                  preference.id,
                  selected,
                  transaction,
                );
              preferenceTimes.push(createdPreferenceTime);
            }
          }
          preference.preferenceTimes = preferenceTimes;
          preferences.push(preference);
        }
      }
      await transaction.commit();
      return preferences;
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }
}
