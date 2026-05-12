import { TurnPreferenceEnum } from '@enums';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum } from 'class-validator';

export class RegisterPreferenceTimeDto {
  @IsEnum(TurnPreferenceEnum)
  turn: TurnPreferenceEnum;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  preference: boolean[][];
}
