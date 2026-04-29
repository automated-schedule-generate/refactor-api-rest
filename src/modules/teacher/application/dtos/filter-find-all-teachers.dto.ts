import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterFindAllTeachersDto extends PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Search query by teacher name',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
