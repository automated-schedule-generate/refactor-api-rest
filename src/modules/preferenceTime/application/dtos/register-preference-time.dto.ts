import { TurnPreferenceEnum } from '@enums';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum } from 'class-validator';

// class PreferenceRowDTO {
//   @IsArray()
//   @ArrayMinSize(6)
//   @ArrayMaxSize(6)
//   @IsBoolean({ each: true })
//   values: boolean[];
// }

export class RegisterPreferenceTimeDto {
  @IsEnum(TurnPreferenceEnum)
  turn: TurnPreferenceEnum;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  preference: boolean[][];
}
