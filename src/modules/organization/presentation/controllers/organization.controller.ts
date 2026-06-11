import { RegisterOrganizationDto, UpdateOrganizationDto } from '@dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteOrganizationUseCase,
  FindAllOrganizationsUseCase,
  FindOrganizationByIdUseCase,
  RegisterOrganizationUseCase,
  RestoreOrganizationUseCase,
  SoftDeleteOrganizationUseCase,
  UpdateOrganizationUseCase,
} from '@use-cases';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@ApiTags('organization')
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly registerOrganizationUseCase: RegisterOrganizationUseCase,
    private readonly findAllOrganizationsUseCase: FindAllOrganizationsUseCase,
    private readonly findOrganizationByIdUseCase: FindOrganizationByIdUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
    private readonly softDeleteOrganizationUseCase: SoftDeleteOrganizationUseCase,
    private readonly restoreOrganizationUseCase: RestoreOrganizationUseCase,
  ) {}

  @ApiOperation({ summary: 'Cadastrar nova organização' })
  @Post()
  async register(@Body() dto: RegisterOrganizationDto) {
    return await this.registerOrganizationUseCase.execute(dto);
  }

  @ApiOperation({ summary: 'Listar todas as organizações' })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
    @Query('search') search?: string,
  ) {
    return await this.findAllOrganizationsUseCase.execute(
      query.page,
      query.limit,
      search,
    );
  }

  @ApiOperation({ summary: 'Buscar organização por ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.findOrganizationByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Atualizar organização' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return await this.updateOrganizationUseCase.execute(id, dto);
  }

  @ApiOperation({ summary: 'Remover organização permanentemente' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteOrganizationUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Desativar organização (soft delete)' })
  @Patch(':id/deactivate')
  async softDelete(@Param('id') id: string) {
    return await this.softDeleteOrganizationUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Restaurar organização desativada' })
  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    return await this.restoreOrganizationUseCase.execute(id);
  }
}
