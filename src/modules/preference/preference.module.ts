import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreferenceModel } from '@models';
import { PreferenceController } from '@controllers';
import { PreferenceRepository } from '@repositories';
import { PreferenceRepositoryImpl } from '@repositories.impl';
import { PreferenceTimeModule, TeacherModule } from '@modules';
import {
  DeletePreferenceUseCase,
  GetOneTeacherPreferenceUseCase,
  RegisterPreferenceUseCase,
  UpdatePreferenceUseCase,
  GetTeacherPreferenceUseCase,
} from '@use-cases';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([PreferenceModel]),
    forwardRef(() => TeacherModule),
    PreferenceTimeModule,
  ],
  controllers: [PreferenceController],
  providers: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
    RegisterPreferenceUseCase,
    GetOneTeacherPreferenceUseCase,
    GetTeacherPreferenceUseCase,
    DeletePreferenceUseCase,
    UpdatePreferenceUseCase,
  ],
  exports: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
  ],
})
export class PreferenceModule {}
