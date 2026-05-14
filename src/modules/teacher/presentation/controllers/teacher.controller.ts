import {
  RegisterTeacherDto,
  RegisterTeacherSpecialNeedDto,
  FilterFindAllTeachersDto,
} from '@dtos';
import { TeacherEntity } from '@entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteTeacherUseCase,
  FindAllTeachersUseCase,
  FindTeacherByIdUseCase,
  RegisterTeacherUseCase,
  UpdateTeacherUseCase,
} from '@use-cases';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';

@ApiTags('teacher')
@ApiBearerAuth()
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly registerTeacherUseCase: RegisterTeacherUseCase,
    private readonly updateTeacherUseCase: UpdateTeacherUseCase,
    private readonly deleteTeacherUseCase: DeleteTeacherUseCase,
    private readonly findAllTeachersUseCase: FindAllTeachersUseCase,
    private readonly findTeacherByIdUseCase: FindTeacherByIdUseCase,
  ) {}

  @ApiOperation({
    summary: 'Registrar professor',
  })
  @Post()
  registerTeacher(@Body() data: RegisterTeacherDto): Promise<TeacherEntity> {
    return this.registerTeacherUseCase.execute(data);
  }

  @ApiOperation({
    summary: 'Atualizar professor',
  })
  @Put()
  updateTeacher(
    @Req() req: IAuthenticatedRequest,
    @Body() data: RegisterTeacherSpecialNeedDto,
  ): Promise<TeacherEntity> {
    return this.updateTeacherUseCase.execute(req.user.id, data);
  }

  @ApiOperation({
    summary: 'Deletar professor',
  })
  @Delete(':user_id')
  deleteTeacher(
    @Param('user_id', new ParseUUIDPipe({ version: '4' })) user_id: string,
  ): Promise<void> {
    return this.deleteTeacherUseCase.execute(user_id);
  }

  @ApiOperation({
    summary: 'Buscar todos os professores',
  })
  @Get()
  findAllTeachers(@Query() query: FilterFindAllTeachersDto) {
    return this.findAllTeachersUseCase.execute(query);
  }

  @ApiOperation({
    summary: 'Buscar professor por ID',
  })
  @Get(':user_id')
  findTeacherById(
    @Param('user_id', new ParseUUIDPipe({ version: '4' })) user_id: string,
  ) {
    return this.findTeacherByIdUseCase.execute(user_id);
  }
}
