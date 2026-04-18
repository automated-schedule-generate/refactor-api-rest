import { RegisterSubjectDto } from './register-subject.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class RegisterSubjectItemDto extends RegisterSubjectDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do curso',
    required: false,
  })
  @IsString()
  @IsOptional()
  declare course_id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: `
      ID da disciplina pré-requisito,
      O prerequisito deve ser de uma disciplina criada anteriormente
    `,
    required: false,
  })
  @IsString()
  @IsOptional()
  declare prerequisite_id?: string;
}

export class RegisterManySubjectDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do curso',
  })
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty({
    example: [
      {
        name: 'Cálculo I',
        workload: 40,
        is_optional: false,
        prerequisite_id: '123e4567-e89b-12d3-a456-426614174000',
      },
      {
        name: 'Cálculo II',
        workload: 40,
        is_optional: false,
        prerequisite_id: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
    description: 'Lista de disciplinas',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RegisterSubjectItemDto)
  subjects: RegisterSubjectItemDto[];
}
