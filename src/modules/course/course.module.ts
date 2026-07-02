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
  FindTimetableBySemesterUseCase,
} from '@use-cases';
import { CourseQueryBuilder } from '@builders';
import { SemesterModule } from '@modules';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([CourseModel]),
    forwardRef(() => SemesterModule),
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
    FindTimetableBySemesterUseCase,
  ],
  exports: [
    {
      provide: CourseRepository,
      useClass: CourseRepositoryImpl,
    },
  ],
})
export class CourseModule {}
