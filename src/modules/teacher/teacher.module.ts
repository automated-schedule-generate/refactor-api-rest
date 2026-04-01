import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeacherModel } from '@models';
import { TeacherController } from '@controllers';
import { TeacherRepository } from '@repositories';
import { TeacherRepositoryImpl } from '@repositories.impl';
import { UserModule } from '@modules';
import {
  DeleteTeacherUseCase,
  FindAllTeachersUseCase,
  RegisterTeacherUseCase,
  UpdateTeacherUseCase,
} from '@use-cases';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([TeacherModel]),
    forwardRef(() => UserModule),
  ],
  controllers: [TeacherController],
  providers: [
    {
      provide: TeacherRepository,
      useClass: TeacherRepositoryImpl,
    },
    RegisterTeacherUseCase,
    UpdateTeacherUseCase,
    DeleteTeacherUseCase,
    FindAllTeachersUseCase,
  ],
  exports: [
    {
      provide: TeacherRepository,
      useClass: TeacherRepositoryImpl,
    },
  ],
})
export class TeacherModule {}
