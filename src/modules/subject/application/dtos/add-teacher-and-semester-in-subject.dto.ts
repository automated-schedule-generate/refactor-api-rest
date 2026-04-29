import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddTeacherAndSemesterInSubjectDto {
  @ApiProperty({
    example: 'b29099a4-8c64-4041-98c7-cc1243840d94',
    description: 'ID do semestre',
  })
  @IsUUID('4', { message: 'ID do semestre inválido.' })
  @IsString({ message: 'ID do semestre deve ser uma string.' })
  @IsNotEmpty({ message: 'ID do semestre é obrigatório.' })
  semester_id: string;

  @ApiProperty({
    example: 'b29099a4-8c64-4041-98c7-cc1243840d94',
    description: 'ID do professor',
  })
  @IsUUID('4', { message: 'ID do professor inválido.' })
  @IsString({ message: 'ID do professor deve ser uma string.' })
  @IsNotEmpty({ message: 'ID do professor é obrigatório.' })
  teacher_id: string;
}
