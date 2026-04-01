import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'Página atual',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Limite de itens por página',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({
    example: 'created_at',
    description: 'Ordenação por',
    required: false,
  })
  @Type(() => String)
  @IsOptional()
  order: string = 'created_at';
}
