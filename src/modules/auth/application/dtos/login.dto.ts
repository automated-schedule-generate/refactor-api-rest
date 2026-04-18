import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LoginType } from '@enums';

export class LoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Login do usuário',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'email',
    description: 'Tipo de login',
  })
  @IsEnum(LoginType, { message: 'Tipo de login inválido' })
  @IsNotEmpty()
  login_type: LoginType;
}
