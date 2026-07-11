import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, ValidateIf } from 'class-validator';

export class FindTimetableDto {
  @ApiProperty({
    required: false,
    description: 'Search query by semester id',
  })
  @IsString()
  @IsOptional()
  semester_id?: string;

  @ApiProperty({
    required: false,
    description: 'Search query by course id',
  })
  @IsString()
  @ValidateIf(
    (o) => o.course_id !== undefined || o.course_semester !== undefined,
  )
  @IsDefined({
    message: 'course_id is required if course_semester is provided',
  })
  course_id?: string;

  @ApiProperty({
    required: false,
    description: 'Search query by course semester',
  })
  @IsString()
  @IsOptional()
  course_semester?: string;

  @ApiProperty({
    required: false,
    description: 'Search query by teacher id',
  })
  @IsString()
  @IsOptional()
  teacher_id?: string;
}
