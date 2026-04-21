import { RegisterSemesterDto, UpdateSemesterDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ChangeIsFinishedUseCase,
  DeleteSemesterUseCase,
  FindAllSemestersUseCase,
  RegisterSemesterUseCase,
  UpdateSemesterUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@ApiTags('semester')
@Controller('semester')
export class SemesterController {
  constructor(
    private readonly registerSemesterUseCase: RegisterSemesterUseCase,
    private readonly updateSemesterUseCase: UpdateSemesterUseCase,
    private readonly deleteSemesterUseCase: DeleteSemesterUseCase,
    private readonly changeIsFinishedUseCase: ChangeIsFinishedUseCase,
    private readonly findAllSemestersUseCase: FindAllSemestersUseCase,
  ) {}

  @ApiOperation({
    summary: 'Find all semesters',
    description: 'Find all semesters',
  })
  @ApiBearerAuth()
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.findAllSemestersUseCase.execute(query.page, query.limit);
  }

  @ApiOperation({
    summary: 'Register a new semester',
    description: 'Register a new semester',
  })
  @ApiBearerAuth()
  @Post()
  async register(@Body() body: RegisterSemesterDto) {
    return await this.registerSemesterUseCase.execute(body);
  }

  @ApiOperation({
    summary: 'Update a semester',
    description: 'Update a semester',
  })
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateSemesterDto,
  ) {
    return await this.updateSemesterUseCase.execute(id, body);
  }

  @ApiOperation({
    summary: 'Delete a semester',
    description: 'Delete a semester',
  })
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.deleteSemesterUseCase.execute(id);
  }

  @ApiOperation({
    summary: 'Change if a semester is finished',
    description: 'Change if a semester is finished',
  })
  @ApiBearerAuth()
  @Patch(':id')
  async changeIsFinished(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.changeIsFinishedUseCase.execute(id);
  }
}
