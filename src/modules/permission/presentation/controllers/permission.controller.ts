import { RegisterPermissionDto, UpdatePermissionDto } from '@dtos';
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
  DeletePermissionUseCase,
  FindAllPermissionsUseCase,
  FindPermissionByIdUseCase,
  RegisterPermissionUseCase,
  UpdatePermissionUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@ApiTags('permission')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly registerPermissionUseCase: RegisterPermissionUseCase,
    private readonly findAllPermissionsUseCase: FindAllPermissionsUseCase,
    private readonly findPermissionByIdUseCase: FindPermissionByIdUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
  ) {}

  @ApiOperation({ summary: 'Cadastrar nova permissão' })
  @Post()
  async register(@Body() dto: RegisterPermissionDto) {
    return await this.registerPermissionUseCase.execute(dto);
  }

  @ApiOperation({ summary: 'Listar todas as permissões' })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
    @Query('search') search?: string,
  ) {
    return await this.findAllPermissionsUseCase.execute(
      query.page,
      query.limit,
      search,
    );
  }

  @ApiOperation({ summary: 'Buscar permissão por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.findPermissionByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Atualizar permissão' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return await this.updatePermissionUseCase.execute(id, dto);
  }

  @ApiOperation({ summary: 'Remover permissão' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deletePermissionUseCase.execute(id);
  }
}
