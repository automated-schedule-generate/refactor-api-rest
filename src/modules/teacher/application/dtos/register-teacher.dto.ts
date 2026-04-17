import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkloadEnum } from '@enums';

export class RegisterTeacherDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do usuário',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    enum: WorkloadEnum,
    example: WorkloadEnum.HR_20,
    description: 'Carga horária',
  })
  @IsEnum(WorkloadEnum)
  @IsNotEmpty()
  workload: WorkloadEnum;
}
