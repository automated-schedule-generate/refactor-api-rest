import { RegisterUserRoleOrganizationDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteUserRoleOrganizationUseCase,
  FindAllUserRoleOrganizationUseCase,
  FindByUserIdUserRoleOrganizationUseCase,
  RegisterUserRoleOrganizationUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@ApiTags('user-role-organization')
@ApiBearerAuth()
@Controller('user-role-organization')
export class UserRoleOrganizationController {
  constructor(
    private readonly registerUseCase: RegisterUserRoleOrganizationUseCase,
    private readonly findAllUseCase: FindAllUserRoleOrganizationUseCase,
    private readonly findByUserIdUseCase: FindByUserIdUserRoleOrganizationUseCase,
    private readonly deleteUseCase: DeleteUserRoleOrganizationUseCase,
  ) {}

  @ApiOperation({ summary: 'Vincular usuário a papel e organização' })
  @Post()
  async register(@Body() dto: RegisterUserRoleOrganizationDto) {
    return await this.registerUseCase.execute(dto);
  }

  @ApiOperation({ summary: 'Listar todos os vínculos' })
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.findAllUseCase.execute(query.page, query.limit);
  }

  @ApiOperation({ summary: 'Listar vínculos de um usuário' })
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.findByUserIdUseCase.execute(userId);
  }

  @ApiOperation({ summary: 'Remover vínculo por ID' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
