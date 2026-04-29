import { IsInt, Min, IsOptional, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'Página atual',
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Limite de itens por página',
    required: false,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({
    description: 'Ordenação por campo (ex: id, name)',
    required: false,
  })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty({
    description: 'Ordenação ascendente ou descendente (ASC ou DESC)',
    required: false,
  })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  order_direction?: 'ASC' | 'DESC';
}
