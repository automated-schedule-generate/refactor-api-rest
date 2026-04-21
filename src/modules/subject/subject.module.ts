import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectController } from '@controllers';
import { SubjectRepository } from '@repositories';
import { SubjectRepositoryImpl } from '@repositories.impl';
import { CourseModule } from '../course/course.module';
import {
  DeleteSubjectUseCase,
  FindAllSubjectsByCourseIdUseCase,
  FindAllSubjectsByPrerequisiteIdUseCase,
  FindSubjectByCourseIdUseCase,
  FindSubjectByPrerequisiteIdUseCase,
  RegisterManySubjectsUseCase,
  RegisterSubjectUseCase,
  UpdateSubjectUseCase,
  FindAllSubjectsUseCase,
  FindSubjectByIdUseCase,
} from '@use-cases';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([SubjectModel]),
    forwardRef(() => CourseModule),
  ],
  controllers: [SubjectController],
  providers: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
    DeleteSubjectUseCase,
    FindAllSubjectsByCourseIdUseCase,
    FindAllSubjectsByPrerequisiteIdUseCase,
    FindSubjectByCourseIdUseCase,
    FindSubjectByPrerequisiteIdUseCase,
    RegisterManySubjectsUseCase,
    RegisterSubjectUseCase,
    UpdateSubjectUseCase,
    FindAllSubjectsUseCase,
    FindSubjectByIdUseCase,
  ],
  exports: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
  ],
})
export class SubjectModule {}
