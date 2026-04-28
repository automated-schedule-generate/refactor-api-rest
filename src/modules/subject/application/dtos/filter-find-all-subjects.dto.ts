import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllSubjectsDto extends PaginationDto {
  @ApiProperty({
    example: true,
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
    example: '74c09804-3216-456e-926a-b848b3431c40',
    description: 'ID do curso',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  course_id?: string;

  @ApiProperty({
    example: '74c09804-3216-456e-926a-b848b3431c40',
    description: 'ID do pré-requisito',
    required: false,
  })
  @IsUUID()
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
  with_pagination: boolean;
}
