import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreferenceModel } from '@models';
import { PreferenceController } from '@controllers';
import { PreferenceRepository } from '@repositories';
import { PreferenceRepositoryImpl } from '@repositories.impl';
import { TeacherModule } from '@modules';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([PreferenceModel]),
    forwardRef(() => TeacherModule),
  ],
  controllers: [PreferenceController],
  providers: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: PreferenceRepository,
      useClass: PreferenceRepositoryImpl,
    },
  ],
})
export class PreferenceModule {}
