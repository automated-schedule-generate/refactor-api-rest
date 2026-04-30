import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassModel } from '@models';
import { ClassController } from '@controllers';
import { ClassRepository } from '@repositories';
import { ClassRepositoryImpl } from '@repositories.impl';
import {
  DeleteClassUseCase,
  FindAllClassUseCase,
  RegisterClassUseCase,
  UpdateClassUseCase,
} from '@use-cases';
import { CourseModule, SemesterModule } from '@modules';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([ClassModel]),
    forwardRef(() => CourseModule),
    forwardRef(() => SemesterModule),
  ],
  controllers: [ClassController],
  providers: [
    {
      provide: ClassRepository,
      useClass: ClassRepositoryImpl,
    },
    FindAllClassUseCase,
    RegisterClassUseCase,
    UpdateClassUseCase,
    DeleteClassUseCase,
  ],
  exports: [
    {
      provide: ClassRepository,
      useClass: ClassRepositoryImpl,
    },
  ],
})
export class ClassModule {}
