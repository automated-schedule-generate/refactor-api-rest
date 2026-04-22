import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SemesterModel } from '@models';
import { SemesterController } from '@controllers';
import { SemesterRepository } from '@repositories';
import { SemesterRepositoryImpl } from '@repositories.impl';
import {
  ChangeIsFinishedUseCase,
  DeleteSemesterUseCase,
  FindAllSemestersUseCase,
  RegisterSemesterUseCase,
  UpdateSemesterUseCase,
} from '@use-cases';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([SemesterModel])],
  controllers: [SemesterController],
  providers: [
    {
      provide: SemesterRepository,
      useClass: SemesterRepositoryImpl,
    },
    RegisterSemesterUseCase,
    UpdateSemesterUseCase,
    DeleteSemesterUseCase,
    ChangeIsFinishedUseCase,
    FindAllSemestersUseCase,
  ],
  exports: [
    {
      provide: SemesterRepository,
      useClass: SemesterRepositoryImpl,
    },
  ],
})
export class SemesterModule {}
