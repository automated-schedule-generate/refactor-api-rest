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
  DeleteSubjectUseCase,
  FindAllSubjectsByCourseIdUseCase,
  FindAllSubjectsByPrerequisiteIdUseCase,
  FindSubjectByCourseIdUseCase,
  FindSubjectByPrerequisiteIdUseCase,
  RegisterManySubjectsUseCase,
  RegisterSubjectUseCase,
  UpdateSubjectUseCase,
} from '@use-cases';
import { Post } from '@nestjs/common';
import {
  RegisterManySubjectDto,
  RegisterSubjectDto,
  UpdateSubjectDto,
} from '@dtos';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { FindAllSubjectsUseCase } from '../../application/use-cases/find-all-subjects.use-case';
import { FindSubjectByIdUseCase } from '../../application/use-cases/find-subject-by-id.use-case';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(
    private readonly registerSubjectUseCase: RegisterSubjectUseCase,
    private readonly updateSubjectUseCase: UpdateSubjectUseCase,
    private readonly deleteSubjectUseCase: DeleteSubjectUseCase,
    private readonly registerManySubjectsUseCase: RegisterManySubjectsUseCase,
    private readonly findAllByCourseIdUseCase: FindAllSubjectsByCourseIdUseCase,
    private readonly findAllByPrerequisiteIdUseCase: FindAllSubjectsByPrerequisiteIdUseCase,
    private readonly findByCourseIdUseCase: FindSubjectByCourseIdUseCase,
    private readonly findByPrerequisiteIdUseCase: FindSubjectByPrerequisiteIdUseCase,
    private readonly findAllSubjectsUseCase: FindAllSubjectsUseCase,
    private readonly findSubjectByIdUseCase: FindSubjectByIdUseCase,
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
    summary: 'Buscar todas as disciplinas de um curso',
  })
  @Get('course/:course_id/all')
  async findAllByCourseId(
    @Param('course_id', new ParseUUIDPipe({ version: '4' })) course_id: string,
  ) {
    return await this.findAllByCourseIdUseCase.execute(course_id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar todas as disciplinas de um pré-requisito',
  })
  @Get('prerequisite/:prerequisite_id/all')
  async findAllByPrerequisiteId(
    @Param('prerequisite_id', new ParseUUIDPipe({ version: '4' }))
    prerequisite_id: string,
  ) {
    return await this.findAllByPrerequisiteIdUseCase.execute(prerequisite_id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar todas as disciplinas de um curso com paginação',
  })
  @Get('course/:course_id')
  async findByCourseId(
    @Param('course_id', new ParseUUIDPipe({ version: '4' })) course_id: string,
    @Query() query: PaginationDto,
  ) {
    return await this.findByCourseIdUseCase.execute(
      course_id,
      query.page,
      query.limit,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar todas as disciplinas de um pré-requisito com paginação',
  })
  @Get('prerequisite/:prerequisite_id')
  async findByPrerequisiteId(
    @Param('prerequisite_id', new ParseUUIDPipe({ version: '4' }))
    prerequisite_id: string,
    @Query() query: PaginationDto,
  ) {
    return await this.findByPrerequisiteIdUseCase.execute(
      prerequisite_id,
      query.page,
      query.limit,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar todas as disciplinas com paginação',
  })
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.findAllSubjectsUseCase.execute(query.page, query.limit);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar disciplina por id',
  })
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.findSubjectByIdUseCase.execute(id);
  }
}
