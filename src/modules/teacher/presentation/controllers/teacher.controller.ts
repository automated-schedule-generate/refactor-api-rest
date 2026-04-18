import { RegisterTeacherDto, RegisterTeacherSpecialNeedDto } from '@dtos';
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteTeacherUseCase,
  FindAllTeachersUseCase,
  RegisterTeacherUseCase,
  UpdateTeacherUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';
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
  @Put('me')
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
  deleteTeacher(@Param() params: { user_id: string }): Promise<void> {
    return this.deleteTeacherUseCase.execute(params.user_id);
  }

  @ApiOperation({
    summary: 'Buscar todos os professores',
  })
  @Get()
  findAllTeachers(@Query() query: PaginationDto) {
    return this.findAllTeachersUseCase.execute(query);
  }
}
