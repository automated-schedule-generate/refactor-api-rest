import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FindAllRolesDto extends PaginationDto {
  @ApiProperty({
    description: 'Role name',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
