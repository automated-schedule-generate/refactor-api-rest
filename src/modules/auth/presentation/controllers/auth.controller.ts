import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/commons/metadata/public.metadata';
import { LoginUseCase } from '@use-cases';
import { LoginDto } from '@dtos';

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
}
