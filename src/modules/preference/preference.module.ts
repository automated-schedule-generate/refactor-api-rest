import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreferenceModel, PreferenceTimeModel } from '@models';
import { PreferenceController } from '@controllers';
import { PreferenceRepository, PreferenceTimeRepository } from '@repositories';
import {
  PreferenceRepositoryImpl,
  PreferenceTimeRepositoryImpl,
} from '@repositories.impl';
import { TeacherModule } from '@modules';
import {
  DeletePreferenceUseCase,
  GetOneTeacherPreference,
  RegisterPreferenceUseCase,
  UpdatePreferenceUseCase,
} from '@use-cases';
import { GetTeacherPreference } from './application/use-cases/get-teacher-preference.use-case';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([PreferenceModel, PreferenceTimeModel]),
    forwardRef(() => TeacherModule),
  ],
  controllers: [PreferenceController],
  providers: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
    {
      provide: PreferenceTimeRepository,
      useClass: PreferenceTimeRepositoryImpl,
    },
    RegisterPreferenceUseCase,
    GetOneTeacherPreference,
    GetTeacherPreference,
    DeletePreferenceUseCase,
    UpdatePreferenceUseCase,
  ],
  exports: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
    {
      provide: PreferenceTimeRepository,
      useClass: PreferenceTimeRepositoryImpl,
    },
  ],
})
export class PreferenceModule {}
