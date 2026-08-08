import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllSubjectsDto extends PaginationDto {
  @ApiProperty({
    description: 'Indica se deve retornar as disciplinas com seus cursos',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsOptional()
  with_course?: boolean;

  @ApiProperty({
    description: 'ID do curso',
    required: false,
  })
  @IsUUID('7', { message: 'ID do curso inválido.' })
  @IsOptional()
  course_id?: string;

  @ApiProperty({
    description: 'ID do pré-requisito',
    required: false,
  })
  @IsUUID('7', { message: 'ID do pré-requisito inválido.' })
  @IsOptional()
  prerequisite_id?: string;

  @ApiProperty({
    example: true,
    description: 'Indica se deve retornar com paginação',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'false') return false;
    return true;
  })
  @IsOptional()
  with_pagination!: boolean;

  @ApiProperty({
    description: 'Busca por nome da disciplina',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    example: 1,
    description: 'Buscar por periodo do curso',
    required: false,
  })
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  course_semester?: number;
}
