import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTimetableBySemesterDto {
  @ApiProperty({
    required: false,
    description: 'Search query by course name',
  })
  @IsString()
  @IsOptional()
  semester_id?: string;
}
