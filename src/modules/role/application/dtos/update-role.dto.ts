import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Nome do papel' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name!: string;

  @ApiProperty({ example: 1, description: 'Prioridade do papel' })
  @IsInt({ message: 'A prioridade deve ser um número inteiro' })
  @Min(0, { message: 'A prioridade deve ser maior ou igual a zero' })
  priority!: number;
}
