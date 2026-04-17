import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class RegisterTeacherSpecialNeedDto {
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
