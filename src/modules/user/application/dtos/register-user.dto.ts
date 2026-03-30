import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IsCpfValidator } from 'src/commons/validations/is-cpf.validation';

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
  @IsCpfValidator()
  cpf: string;
}
