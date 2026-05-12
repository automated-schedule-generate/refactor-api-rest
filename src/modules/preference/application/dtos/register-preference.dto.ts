import { RegisterPreferenceTimeDto } from '@dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';

export class RegisterPreferenceDto {
  @ApiProperty({
    example: [
      {
        turn: 'morning',
        preference: [
          [true, false, true, false, true, true],
          [],
          [true, true, false, false, true, false],
          [],
        ],
      },
      {
        turn: 'afternoon',
        preference: [
          [true, false, true, false, true, false],
          [],
          [true, true, false, false, true, true],
          [],
        ],
      },
    ],
    description:
      'Array de preferências do professor. Cada objeto representa um turno (matutino, vespertino ou noturno) e contém um array de preferências para cada dia da semana (segunda a sexta). Cada preferência é representada por um array de booleanos, onde true indica que o professor tem preferência por aquele horário e false indica que não tem preferência.',
  })
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => RegisterPreferenceTimeDto)
  preferences: RegisterPreferenceTimeDto[];
}
