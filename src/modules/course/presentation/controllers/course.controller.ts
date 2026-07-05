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
import {
  RegisterCourseDto,
  FilterFindAllCourseDto,
  FindTimetableBySemesterDto,
} from '@dtos';
import { Body, HttpCode, Post } from '@nestjs/common';
import {
  DeleteCourseUseCase,
  UpdateCourseUseCase,
  FindByIdCourseUseCase,
  FindAllCourseUseCase,
  RegisterCourseUseCase,
  FindTimetableUseCase,
  GenerateTimetableUseCase,
} from '@use-cases';

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
    private readonly findTimetableUseCase: FindTimetableUseCase,
    private readonly generateTimetableUseCase: GenerateTimetableUseCase,
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
  async findAll(@Query() query: FilterFindAllCourseDto) {
    return await this.findAllCourseUseCase.execute(query);
  }

  @ApiOperation({ summary: 'Find course by id' })
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string) {
    return await this.findByIdCourseUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update course' })
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,
    @Body() data: RegisterCourseDto,
  ) {
    return await this.updateCourseUseCase.execute(id, data);
  }

  @ApiOperation({ summary: 'Delete course' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string) {
    return await this.deleteCourseUseCase.execute(id);
  }

  @ApiOperation({
    summary: 'find with timetable by semester',
  })
  @Get('find-timetable')
  @HttpCode(200)
  async findTimetableBySemester(@Query() query: FindTimetableBySemesterDto) {
    return await this.findTimetableUseCase.execute(query);
  }

  @ApiOperation({
    summary: 'generate timetable',
  })
  @Post('generate-timetable')
  @HttpCode(200)
  async generateTimetable() {
    return await this.generateTimetableUseCase.execute();
  }
}
