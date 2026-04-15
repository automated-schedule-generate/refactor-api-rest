import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCoordinatorDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Start date',
  })
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'End date',
  })
  @IsString()
  @IsOptional()
  end_date?: string;
}
