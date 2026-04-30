import { TurnPreferenceEnum } from '@enums';
import { IsArray, IsEnum } from 'class-validator';

export class RegisterPreferenceTimeDto {
  @IsEnum(TurnPreferenceEnum)
  turn: TurnPreferenceEnum;

  @IsArray()
  @IsArray({ each: true })
  preference: (boolean | null)[][];
}
