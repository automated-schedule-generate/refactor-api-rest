import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterFindAllTeachersDto extends PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Search query by teacher name',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    required: false,
    description: 'Include teacher preferences in the response',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  preferences?: boolean;
}
