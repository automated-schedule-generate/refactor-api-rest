import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddTeacherAndSemesterInSubjectUseCase,
  DeleteSubjectUseCase,
  RegisterManySubjectsUseCase,
  RegisterSubjectUseCase,
  UpdateSubjectUseCase,
  FindAllSubjectsUseCase,
  FindSubjectByIdUseCase,
} from '@use-cases';
import { Post } from '@nestjs/common';
import {
  AddTeacherAndSemesterInSubjectDto,
  RegisterManySubjectDto,
  RegisterSubjectDto,
  UpdateSubjectDto,
  FilterFindAllSubjectsDto,
} from '@dtos';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(
    private readonly registerSubjectUseCase: RegisterSubjectUseCase,
    private readonly updateSubjectUseCase: UpdateSubjectUseCase,
    private readonly deleteSubjectUseCase: DeleteSubjectUseCase,
    private readonly registerManySubjectsUseCase: RegisterManySubjectsUseCase,
    private readonly findAllSubjectsUseCase: FindAllSubjectsUseCase,
    private readonly findSubjectByIdUseCase: FindSubjectByIdUseCase,
    private readonly addTeacherAndSemesterInSubjectUseCase: AddTeacherAndSemesterInSubjectUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registrar disciplina',
  })
  @Post()
  async register(@Body() dto: RegisterSubjectDto) {
    return await this.registerSubjectUseCase.execute(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar disciplina',
  })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateSubjectDto,
  ) {
    return await this.updateSubjectUseCase.execute(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar disciplina',
  })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.deleteSubjectUseCase.execute(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registrar muitas disciplinas',
  })
  @Post('register-many')
  async registerMany(@Body() dto: RegisterManySubjectDto) {
    return await this.registerManySubjectsUseCase.execute(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar disciplinas',
  })
  @Get()
  async findAll(@Query() query: FilterFindAllSubjectsDto) {
    return await this.findAllSubjectsUseCase.execute(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar disciplina por id',
  })
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.findSubjectByIdUseCase.execute(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Adicionar professor e semestre em disciplina',
  })
  @Post(':id/add-teacher-and-semester')
  async addTeacherAndSemesterInSubject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: AddTeacherAndSemesterInSubjectDto,
  ) {
    return await this.addTeacherAndSemesterInSubjectUseCase.execute(id, dto);
  }
}
