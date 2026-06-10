import { ShiftEnum } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class FilterFindAllClassDto extends PaginationDto {
  @ApiProperty({
    required: false,
    enum: ShiftEnum,
    description: 'Turno da aula',
  })
  @IsEnum(ShiftEnum)
  @IsOptional()
  shift?: ShiftEnum;

  @ApiProperty({
    required: false,
    description: 'ID do curso',
  })
  @IsUUID('7', { message: 'ID do curso inválido.' })
  @IsOptional()
  course_id?: string;

  @ApiProperty({
    required: false,
    description: 'ID do semestre',
  })
  @IsUUID('7', { message: 'ID do semestre inválido.' })
  @IsOptional()
  semester_id?: string;
}
