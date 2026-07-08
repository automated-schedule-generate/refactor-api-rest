import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllPreferenceDto extends PaginationDto {
  @ApiProperty({
    description: 'ID do professor',
    required: false,
  })
  @IsUUID('7', { message: 'ID do professor inválido.' })
  @IsOptional()
  teacher_id?: string;
}
