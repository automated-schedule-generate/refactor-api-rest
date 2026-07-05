import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTimetableBySemesterDto {
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
  @IsOptional()
  course_id?: string;
}
