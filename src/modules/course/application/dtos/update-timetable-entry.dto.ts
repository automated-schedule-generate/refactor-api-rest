import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTimetableEntryDto {
  @ApiProperty({
    required: true,
    description: 'Day of the week',
  })
  @IsString()
  day: string;

  @ApiProperty({
    required: true,
    description: 'Slot index',
  })
  @IsNumber()
  slot_index: number;

  @ApiProperty({
    required: true,
    description: 'Teacher id',
  })
  @IsString()
  teacher_id: string;

  @ApiProperty({
    required: true,
    description: 'Timetable id',
  })
  @IsString()
  timetable_id: string;
}
