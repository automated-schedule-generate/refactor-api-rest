import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
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
  @IsUUID()
  @IsOptional()
  course_id?: string;

  @ApiProperty({
    description: 'ID do pré-requisito',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  prerequisite_id?: string;

  @ApiProperty({
    description: 'Indica se deve retornar com paginação',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'false') return false;
    return true;
  })
  @IsOptional()
  with_pagination: boolean;

  @ApiProperty({
    description: 'Busca por nome da disciplina',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
