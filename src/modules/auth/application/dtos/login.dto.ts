import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LoginType } from '@enums';

export class LoginDto {
  @ApiProperty({
    example: 'example',
    description: 'Login do usuário',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: '123456',
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
