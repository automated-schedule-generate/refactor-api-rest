import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterTeacherDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do usuário',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    example: true,
    description: 'Necessidade especial',
  })
  @IsBoolean()
  special_need: boolean;

  @ApiProperty({
    example: 'Descrição da necessidade especial',
    description: 'Descrição da necessidade especial',
  })
  @IsString()
  @IsOptional()
  description_special_need?: string;

  @ApiProperty({
    example: 'Observação',
    description: 'Observação',
  })
  @IsString()
  @IsOptional()
  observation?: string;
}
