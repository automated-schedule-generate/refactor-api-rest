import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email do usuário',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Senha do usuário (deve conter letras, números e um caracter especial e/ou letra maiúscula)',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[A-Z!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      'A senha deve conter letras, números e pelo menos um caractere especial ou letra maiúscula',
  })
  password: string;

  @ApiProperty({
    example: '123.456.789-09',
    description: 'CPF do usuário',
  })
  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @ApiProperty({
    example: 'Professor',
    description: 'Função do usuário',
  })
  @IsOptional()
  @IsString({ message: 'A função deve ser uma string' })
  function?: string;

  @ApiProperty({
    example: 'Departamento de Informática',
    description: 'Departamento do usuário',
  })
  @IsOptional()
  @IsString({ message: 'O departamento deve ser uma string' })
  department?: string;
}
