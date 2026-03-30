import { RegisterUserDto, UpdateUserDto } from '@dtos';
import { Body, Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteUserUseCase,
  RegisterUserUseCase,
  UpdateUserUseCase,
} from '@use-cases';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';
import { Public } from 'src/commons/metadata/public.metadata';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Public('user')
  @ApiOperation({
    summary: 'Registrar novo usuário',
  })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.registerUserUseCase.execute(registerUserDto);
  }

  @ApiOperation({
    summary: 'Atualizar usuário',
  })
  @ApiBearerAuth()
  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IAuthenticatedRequest,
  ) {
    return await this.updateUserUseCase.execute(req.user.id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deletar usuário',
  })
  @ApiBearerAuth()
  @Delete()
  async delete(@Req() req: IAuthenticatedRequest) {
    return await this.deleteUserUseCase.execute(req.user.id);
  }
}
