import { RegisterUserDto } from '@dtos';
import { Body, Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DeleteUserUseCase,
  RegisterUserUseCase,
  UpdateUserUseCase,
} from '@use-cases';
import type { IAuthenticated } from 'src/commons/interfaces/authenticated.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

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
  @Put()
  async update(
    @Body() updateUserDto: RegisterUserDto,
    @Req() req: IAuthenticated,
  ) {
    return await this.updateUserUseCase.execute(req.user.id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deletar usuário',
  })
  @Delete()
  async delete(@Req() req: IAuthenticated) {
    return await this.deleteUserUseCase.execute(req.user.id);
  }
}
