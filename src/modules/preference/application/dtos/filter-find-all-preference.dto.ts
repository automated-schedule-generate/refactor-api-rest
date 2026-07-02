import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllPreferenceDto extends PaginationDto {
  @ApiProperty({
    description: 'ID do professor',
    required: false,
  })
  @IsUUID('7', { message: 'ID do professor inválido.' })
  @IsOptional()
  teacher_id?: string;

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
