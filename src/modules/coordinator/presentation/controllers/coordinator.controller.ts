import { AddCoordinatorDto } from '@dtos';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCoordinatorUseCase, UpdateCoordinatorUseCase } from '@use-cases';
import { UpdateCoordinatorDto } from '../../application/dtos/update-coordinator.dto';

@ApiTags('coordinator')
@Controller('coordinator')
export class CoordinatorController {
  constructor(
    private readonly addCoordinatorUseCase: AddCoordinatorUseCase,
    private readonly updateCoordinatorUseCase: UpdateCoordinatorUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add a new coordinator',
  })
  @Post()
  async addCoordinator(@Body() body: AddCoordinatorDto) {
    return await this.addCoordinatorUseCase.execute(body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a coordinator',
  })
  @Put(':id')
  async updateCoordinator(
    @Param('id') id: string,
    @Body() body: UpdateCoordinatorDto,
  ) {
    return await this.updateCoordinatorUseCase.execute(id, body);
  }
}
