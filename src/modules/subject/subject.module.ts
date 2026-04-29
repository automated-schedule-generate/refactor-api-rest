import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectController } from '@controllers';
import { SubjectRepository } from '@repositories';
import { SubjectRepositoryImpl } from '@repositories.impl';
import {
  DeleteSubjectUseCase,
  RegisterManySubjectsUseCase,
  RegisterSubjectUseCase,
  UpdateSubjectUseCase,
  FindAllSubjectsUseCase,
  FindSubjectByIdUseCase,
  AddTeacherAndSemesterInSubjectUseCase,
} from '@use-cases';
import {
  CourseModule,
  SemesterModule,
  SubjectTeacherSemesterModule,
  TeacherModule,
} from '@modules';
import { SubjectQueryBuilder } from '@builders';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([SubjectModel]),
    forwardRef(() => CourseModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => SemesterModule),
    SubjectTeacherSemesterModule,
  ],
  controllers: [SubjectController],
  providers: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
    DeleteSubjectUseCase,
    RegisterManySubjectsUseCase,
    RegisterSubjectUseCase,
    UpdateSubjectUseCase,
    FindAllSubjectsUseCase,
    FindSubjectByIdUseCase,
    AddTeacherAndSemesterInSubjectUseCase,
    SubjectQueryBuilder,
  ],
  exports: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
  ],
})
export class SubjectModule {}
