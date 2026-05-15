import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreferenceTimeModel } from '@models';
import { PreferenceTimeController } from '@controllers';
import { PreferenceTimeRepository } from '@repositories';
import { PreferenceTimeRepositoryImpl } from '@repositories.impl';
import { PreferenceModule } from '@modules';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([PreferenceTimeModel]),
    forwardRef(() => PreferenceModule),
  ],
  controllers: [PreferenceTimeController],
  providers: [
    {
      provide: PreferenceTimeRepository,
      useClass: PreferenceTimeRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: PreferenceTimeRepository,
      useClass: PreferenceTimeRepositoryImpl,
    },
  ],
})
export class PreferenceTimeModule {}
