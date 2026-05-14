import { TurnPreferenceEnum } from '@enums';
import { IsArray, IsEnum } from 'class-validator';
import { IsNestedBooleanArray } from 'src/imports/decorators';

export class RegisterPreferenceTimeDto {
  @IsEnum(TurnPreferenceEnum)
  turn: TurnPreferenceEnum;

  @IsArray()
  @IsNestedBooleanArray()
  preference: boolean[][];
}
