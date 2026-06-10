import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({
    example: 'IFPE Recife',
    description: 'Novo nome da organização',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({ description: 'ID do usuário responsável' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsUUID('all', { message: 'O ID do usuário deve ser um UUID válido' })
  user_id: string;
}
