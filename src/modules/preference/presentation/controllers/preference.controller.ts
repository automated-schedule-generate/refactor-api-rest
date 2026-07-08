import { FilterFindAllPreferenceDto, RegisterPreferenceDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeletePreferenceUseCase,
  GetOneTeacherPreferenceUseCase,
  RegisterPreferenceUseCase,
  UpdatePreferenceUseCase,
  GetTeacherPreferenceUseCase,
} from '@use-cases';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';

@ApiTags('preference')
@Controller('preference')
export class PreferenceController {
  constructor(
    private readonly registerPreferenceUseCase: RegisterPreferenceUseCase,
    private readonly getOneTeacherPreference: GetOneTeacherPreferenceUseCase,
    private readonly getTeacherPreference: GetTeacherPreferenceUseCase,
    private readonly deletePreferenceUseCase: DeletePreferenceUseCase,
    private readonly updatePreferenceUseCase: UpdatePreferenceUseCase,
  ) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registrar preferencia do professor',
  })
  @Post('')
  @HttpCode(200)
  async register(
    @Req() req: IAuthenticatedRequest,
    @Body() dto: RegisterPreferenceDto,
  ) {
    return await this.registerPreferenceUseCase.execute(req.user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pegar preferencia do professor',
  })
  @Get(':userId')
  @HttpCode(200)
  async get(
    @Param('userId', new ParseUUIDPipe({ version: '7' })) userId: string,
  ) {
    return await this.getOneTeacherPreference.execute(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pegar preferencia de todos os professores',
  })
  @Get('')
  @HttpCode(200)
  async getAll(@Query() query: FilterFindAllPreferenceDto) {
    return await this.getTeacherPreference.execute(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar preferencia do professor',
  })
  @Delete(':userId')
  @HttpCode(204)
  async delete(
    @Param('userId', new ParseUUIDPipe({ version: '7' })) userId: string,
  ) {
    return await this.deletePreferenceUseCase.execute(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar preferencia do professor',
  })
  @Put('')
  @HttpCode(200)
  async update(
    @Req() req: IAuthenticatedRequest,
    @Body() dto: RegisterPreferenceDto,
  ) {
    return await this.updatePreferenceUseCase.execute(req.user.id, dto);
  }
}
