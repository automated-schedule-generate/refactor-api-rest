import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/commons/metadata/public.metadata';
import { LoginUseCase, MeUseCase } from '@use-cases';
import { LoginDto } from '@dtos';
import type { IAuthenticatedRequest } from 'src/commons/interfaces/authenticated.interface';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case';
import { RefreshTokenDto } from '../../application/dtos/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly meUseCase: MeUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

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
  async getMe(@Req() req: IAuthenticatedRequest) {
    return await this.meUseCase.execute(req.user.id);
  }

  @Public('auth')
  @ApiOperation({
    summary: 'refresh token',
  })
  @Post('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.refreshTokenUseCase.execute(refreshToken.refresh_token);
  }
}
