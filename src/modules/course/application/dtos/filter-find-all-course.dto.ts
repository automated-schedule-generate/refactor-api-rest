import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllCourseDto extends PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Search query by course name',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
