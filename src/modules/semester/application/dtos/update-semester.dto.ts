import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterSemesterDto } from './register-semester.dto';

export class UpdateSemesterDto extends RegisterSemesterDto {
  @ApiProperty({
    example: true,
    description: 'Status do semestre',
  })
  @IsBoolean()
  @IsOptional()
  is_finished?: boolean;
}
