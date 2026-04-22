import { IsEnum, IsString, Matches } from 'class-validator';
import { SemesterEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterSemesterDto {
  @ApiProperty({
    example: '2022',
    description: 'Ano do semestre',
  })
  @IsString()
  @Matches(/^\d{4}$/)
  year: string;

  @ApiProperty({
    example: SemesterEnum.FIRST,
    description: 'Semestre',
    enum: SemesterEnum,
  })
  @IsEnum(SemesterEnum)
  semester: SemesterEnum;
}
