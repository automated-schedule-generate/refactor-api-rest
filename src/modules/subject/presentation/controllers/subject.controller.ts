import { Body, Controller, Delete, HttpCode, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteSubjectUseCase,
  RegisterSubjectUseCase,
  UpdateSubjectUseCase,
} from '@use-cases';
import { Post } from '@nestjs/common';
import { RegisterSubjectDto, UpdateSubjectDto } from '@dtos';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(
    private readonly registerSubjectUseCase: RegisterSubjectUseCase,
    private readonly updateSubjectUseCase: UpdateSubjectUseCase,
    private readonly deleteSubjectUseCase: DeleteSubjectUseCase,
  ) {}

  @Post()
  async register(@Body() dto: RegisterSubjectDto) {
    return await this.registerSubjectUseCase.execute(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return await this.updateSubjectUseCase.execute(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteSubjectUseCase.execute(id);
  }
}
