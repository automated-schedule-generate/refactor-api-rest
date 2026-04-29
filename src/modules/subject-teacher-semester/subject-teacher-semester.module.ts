import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectTeacherSemesterModel } from '@models';
import { SubjectTeacherSemesterRepository } from '@repositories';
import { SubjectTeacherSemesterRepositoryImpl } from '@repositories.impl';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([SubjectTeacherSemesterModel]),
  ],
  controllers: [],
  providers: [
    {
      provide: SubjectTeacherSemesterRepository,
      useClass: SubjectTeacherSemesterRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: SubjectTeacherSemesterRepository,
      useClass: SubjectTeacherSemesterRepositoryImpl,
    },
  ],
})
export class SubjectTeacherSemesterModule {}
