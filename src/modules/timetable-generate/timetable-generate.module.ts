import { Module } from '@nestjs/common';
import { TimetableService } from '@services';

@Module({
  providers: [TimetableService],
  exports: [TimetableService],
})
export class TimetableGenerateModule {}
