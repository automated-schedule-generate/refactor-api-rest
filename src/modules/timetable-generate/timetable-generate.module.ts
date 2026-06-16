import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimetableGenerateModel } from '@models';
import { TimetableGenerateController } from '@controllers';
import { TimetableGenerateRepository } from '@repositories';
import { TimetableGenerateRepositoryImpl } from '@repositories.impl';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([TimetableGenerateModel]),
  ],
  controllers: [TimetableGenerateController],
  providers: [
    {
      provide: TimetableGenerateRepository,
      useClass: TimetableGenerateRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: TimetableGenerateRepository,
      useClass: TimetableGenerateRepositoryImpl,
    },
  ],
})
export class TimetableGenerateModule {}
