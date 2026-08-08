import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterUserRoleOrganizationDto {
  @ApiProperty({ description: 'ID do usuário' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsUUID('all', { message: 'O ID do usuário deve ser um UUID válido' })
  user_id!: string;

  @ApiProperty({ description: 'ID do papel' })
  @IsNotEmpty({ message: 'O ID do papel é obrigatório' })
  @IsUUID('all', { message: 'O ID do papel deve ser um UUID válido' })
  role_id!: string;

  @ApiProperty({ description: 'ID da organização' })
  @IsNotEmpty({ message: 'O ID da organização é obrigatório' })
  @IsUUID('all', { message: 'O ID da organização deve ser um UUID válido' })
  organization_id!: string;
}
