import { DatabaseModule } from '@database/database.module';
import { TimetableEntryModel } from '@models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimetableEntryRepository } from '@repositories';
import { TimetableEntryRepositoryImpl } from '@repositories.impl';
import { TimetableService } from '@services';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([TimetableEntryModel])],
  providers: [
    TimetableService,
    {
      provide: TimetableEntryRepository,
      useClass: TimetableEntryRepositoryImpl,
    },
  ],
  exports: [
    TimetableService,
    {
      provide: TimetableEntryRepository,
      useClass: TimetableEntryRepositoryImpl,
    },
  ],
})
export class TimetableGenerateModule {}
