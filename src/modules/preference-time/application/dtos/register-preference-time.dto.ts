import { TurnPreferenceEnum } from '@enums';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum } from 'class-validator';
import { IsNestedBooleanArray } from 'src/modules/preference/infrastructure/decorators/Is-Nested-Boolean-array.decorator';

export class RegisterPreferenceTimeDto {
  @IsEnum(TurnPreferenceEnum)
  turn: TurnPreferenceEnum;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsNestedBooleanArray()
  preference: boolean[][];
}
