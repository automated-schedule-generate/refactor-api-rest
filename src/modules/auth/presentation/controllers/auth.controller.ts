import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/commons/metadata/public.metadata';
import { LoginUseCase } from '@use-cases';
import { LoginDto } from '@dtos';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public('auth')
  @ApiOperation({
    summary: 'Login',
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.loginUseCase.execute(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get me my user',
  })
  @Get('me')
  getMe(@Req() req: IAuthenticatedRequest) {
    return req.user;
  }
}
