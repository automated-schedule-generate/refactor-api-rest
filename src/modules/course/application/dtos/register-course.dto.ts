import { ClassTimeEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class RegisterCourseDto {
  @ApiProperty({
    example: 'Ciência da Computação',
    description: 'Nome do curso',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 8,
    description: 'Total de semestres',
  })
  @IsNumber()
  @IsNotEmpty()
  total_semesters: number;

  @ApiProperty({
    enum: ClassTimeEnum,
    example: ClassTimeEnum.MIN_45,
    description: 'Tempo de aula',
  })
  @IsEnum(ClassTimeEnum)
  @IsNotEmpty()
  class_time: ClassTimeEnum;
}
