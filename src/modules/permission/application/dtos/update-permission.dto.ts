import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @ApiProperty({
    example: '/admin/users',
    description: 'Novo caminho da permissão',
  })
  @IsNotEmpty({ message: 'O caminho é obrigatório' })
  @IsString({ message: 'O caminho deve ser uma string' })
  path: string;
}
