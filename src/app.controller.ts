import { Controller, Get } from '@nestjs/common';
import { Public } from './commons/metadata/public.metadata';
// import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Public()
  // @ApiOperation({
  //   summary: 'Test compression',
  // })
  @Get('test-compression')
  testCompression(): { index: number }[] {
    const response: { index: number }[] = [];

    for (let i = 0; i < 1_000_000; i++) {
      response.push({
        index: i,
      });
    }
    return response;
  }
}
