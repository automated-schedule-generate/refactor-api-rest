import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterSubjectDto {
  @ApiProperty({
    example: 'Cálculo I',
    description: 'Nome da disciplina',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 40,
    description: 'Carga horária da disciplina',
  })
  @IsNumber()
  @IsNotEmpty()
  workload: number;

  @ApiProperty({
    example: false,
    description: 'Se a disciplina é optativa',
  })
  @IsBoolean()
  @IsNotEmpty()
  is_optional: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID da disciplina pré-requisito',
    required: false,
  })
  @IsString()
  @IsOptional()
  prerequisite_id?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do curso',
  })
  @IsString()
  @IsNotEmpty()
  course_id: string;
}
