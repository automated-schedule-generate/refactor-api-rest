import { ShiftEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RegisterClassDto {
  @ApiProperty({
    required: false,
    description: 'Identificação da turma',
  })
  @IsString()
  @IsOptional()
  identify?: string;

  @ApiProperty({
    enum: ShiftEnum,
    required: true,
    example: ShiftEnum.MORNING,
    description: 'Turno da aula',
  })
  @IsEnum(ShiftEnum)
  @IsNotEmpty()
  shift: ShiftEnum;

  @ApiProperty({
    required: true,
    example: 1,
    description: 'Semestre que a turma pertence',
  })
  @IsNumber()
  @IsNotEmpty()
  course_semester: number;

  @ApiProperty({
    required: true,
    description: 'ID do curso',
  })
  @IsUUID()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty({
    required: true,
    description: 'ID do semestre',
  })
  @IsUUID()
  @IsNotEmpty()
  semester_id: string;
}
