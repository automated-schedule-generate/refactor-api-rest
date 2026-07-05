import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseModel } from '@models';
import { CourseController } from '@controllers';
import { CourseRepository } from '@repositories';
import { CourseRepositoryImpl } from '@repositories.impl';
import {
  DeleteCourseUseCase,
  FindAllCourseUseCase,
  FindByIdCourseUseCase,
  UpdateCourseUseCase,
  RegisterCourseUseCase,
  FindTimetableUseCase,
  GenerateTimetableUseCase,
} from '@use-cases';
import { CourseQueryBuilder } from '@builders';
import { SemesterModule } from '@modules';
import { TimetableGenerateModule } from '../timetable-generate/timetable-generate.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([CourseModel]),
    forwardRef(() => SemesterModule),
    TimetableGenerateModule,
  ],
  controllers: [CourseController],
  providers: [
    {
      provide: CourseRepository,
      useClass: CourseRepositoryImpl,
    },
    RegisterCourseUseCase,
    FindAllCourseUseCase,
    FindByIdCourseUseCase,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    CourseQueryBuilder,
    FindTimetableUseCase,
    GenerateTimetableUseCase,
  ],
  exports: [
    {
      provide: CourseRepository,
      useClass: CourseRepositoryImpl,
    },
  ],
})
export class CourseModule {}
