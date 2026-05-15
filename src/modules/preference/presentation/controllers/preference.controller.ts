import { RegisterPreferenceDto } from '@dtos';
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeletePreferenceUseCase,
  GetOneTeacherPreference,
  RegisterPreferenceUseCase,
  UpdatePreferenceUseCase,
} from '@use-cases';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';
import { GetTeacherPreference } from '../../application/use-cases/get-teacher-preference.use-case';

@ApiTags('preference')
@Controller('preference')
export class PreferenceController {
  constructor(
    private readonly registerPreferenceUseCase: RegisterPreferenceUseCase,
    private readonly getOneTeacherPreference: GetOneTeacherPreference,
    private readonly getTeacherPreference: GetTeacherPreference,
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
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return await this.getOneTeacherPreference.execute(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pegar preferencia de todos os professores',
  })
  @Get('')
  @HttpCode(200)
  async getAll() {
    return await this.getTeacherPreference.execute();
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar preferencia do professor',
  })
  @Delete(':userId')
  @HttpCode(204)
  async delete(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
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
