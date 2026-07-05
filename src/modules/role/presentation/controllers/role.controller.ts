import {
  AddPermissionToRoleDto,
  FindAllRolesDto,
  RegisterRoleDto,
  UpdateRoleDto,
} from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddPermissionToRoleUseCase,
  DeleteRoleUseCase,
  FindAllRolesUseCase,
  FindRoleByIdUseCase,
  RegisterRoleUseCase,
  RemovePermissionFromRoleUseCase,
  UpdateRoleUseCase,
} from '@use-cases';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(
    private readonly registerRoleUseCase: RegisterRoleUseCase,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly addPermissionToRoleUseCase: AddPermissionToRoleUseCase,
    private readonly removePermissionFromRoleUseCase: RemovePermissionFromRoleUseCase,
  ) {}

  @ApiOperation({ summary: 'Cadastrar novo papel' })
  @Post()
  async register(@Body() dto: RegisterRoleDto) {
    return await this.registerRoleUseCase.execute(dto);
  }

  @ApiOperation({ summary: 'Listar todos os papéis' })
  @Get()
  async findAll(@Query() query: FindAllRolesDto) {
    return await this.findAllRolesUseCase.execute(
      query.page,
      query.limit,
      query?.search,
    );
  }

  @ApiOperation({ summary: 'Buscar papel por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.findRoleByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Atualizar papel' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return await this.updateRoleUseCase.execute(id, dto);
  }

  @ApiOperation({ summary: 'Remover papel' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteRoleUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Adicionar permissão ao papel' })
  @Post(':id/permission')
  async addPermission(
    @Param('id') id: string,
    @Body() dto: AddPermissionToRoleDto,
  ) {
    return await this.addPermissionToRoleUseCase.execute(id, dto);
  }

  @ApiOperation({ summary: 'Remover permissão do papel' })
  @Delete(':id/permission/:permissionId')
  async removePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return await this.removePermissionFromRoleUseCase.execute(id, permissionId);
  }
}
