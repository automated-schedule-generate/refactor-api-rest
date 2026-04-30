import { RegisterPreferenceTimeDto } from '@dtos';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';

export class RegisterPreferenceDto {
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => RegisterPreferenceTimeDto)
  preferences: RegisterPreferenceTimeDto[];
}
