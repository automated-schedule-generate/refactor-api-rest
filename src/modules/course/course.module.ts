import { Module } from '@nestjs/common';
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
} from '@use-cases';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([CourseModel])],
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
  ],
  exports: [
    {
      provide: CourseRepository,
      useClass: CourseRepositoryImpl,
    },
  ],
})
export class CourseModule {}
