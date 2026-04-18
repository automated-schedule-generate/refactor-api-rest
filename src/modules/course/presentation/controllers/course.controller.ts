import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterCourseDto } from '@dtos';
import { Body, HttpCode, Post } from '@nestjs/common';
import {
  DeleteCourseUseCase,
  UpdateCourseUseCase,
  FindByIdCourseUseCase,
  FindAllCourseUseCase,
  RegisterCourseUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@ApiTags('course')
@ApiBearerAuth()
@Controller('course')
export class CourseController {
  constructor(
    private readonly registerCourseUseCase: RegisterCourseUseCase,
    private readonly findAllCourseUseCase: FindAllCourseUseCase,
    private readonly findByIdCourseUseCase: FindByIdCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new course' })
  @Post()
  @HttpCode(201)
  async register(@Body() data: RegisterCourseDto) {
    return await this.registerCourseUseCase.execute(data);
  }

  @ApiOperation({ summary: 'Find all courses' })
  @Get()
  @HttpCode(200)
  async findAll(@Query() query: PaginationDto) {
    return await this.findAllCourseUseCase.execute(query.page, query.limit);
  }

  @ApiOperation({ summary: 'Find course by id' })
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.findByIdCourseUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update course' })
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: RegisterCourseDto,
  ) {
    return await this.updateCourseUseCase.execute(id, data);
  }

  @ApiOperation({ summary: 'Delete course' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.deleteCourseUseCase.execute(id);
  }
}
