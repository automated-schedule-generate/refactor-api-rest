import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddPermissionToRoleDto {
  @ApiProperty({
    example: '01234567-89ab-cdef-0123-456789abcdef',
    description: 'ID da permissão',
  })
  @IsNotEmpty({ message: 'O ID da permissão é obrigatório' })
  @IsUUID('all', { message: 'O ID da permissão deve ser um UUID válido' })
  permission_id: string;
}
