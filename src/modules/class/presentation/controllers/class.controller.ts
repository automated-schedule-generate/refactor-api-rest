import { FilterFindAllClassDto, RegisterClassDto, UpdateClassDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteClassUseCase,
  FindAllClassUseCase,
  RegisterClassUseCase,
  UpdateClassUseCase,
} from '@use-cases';

@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(
    private readonly findAllClassUseCase: FindAllClassUseCase,
    private readonly registerClassUseCase: RegisterClassUseCase,
    private readonly updateClassUseCase: UpdateClassUseCase,
    private readonly deleteClassUseCase: DeleteClassUseCase,
  ) {}

  @ApiOperation({
    summary: 'Find all classes',
  })
  @ApiBearerAuth()
  @Get()
  async findAll(@Query() query: FilterFindAllClassDto) {
    return await this.findAllClassUseCase.execute(query);
  }

  @ApiOperation({
    summary: 'Register a new class',
  })
  @ApiBearerAuth()
  @Post()
  async register(@Body() body: RegisterClassDto) {
    return await this.registerClassUseCase.execute(body);
  }

  @ApiOperation({
    summary: 'Update a class',
  })
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateClassDto,
  ) {
    return await this.updateClassUseCase.execute(id, body);
  }

  @ApiOperation({
    summary: 'Delete a class',
  })
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.deleteClassUseCase.execute(id);
  }
}
