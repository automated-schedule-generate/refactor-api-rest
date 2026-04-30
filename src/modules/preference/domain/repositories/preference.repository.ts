import { RegisterPreferenceDto } from '@dtos';
import { PreferenceEntity } from '@entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PreferenceRepository {
  abstract register(
    userId: number,
    dto: RegisterPreferenceDto,
  ): Promise<PreferenceEntity>;
}
