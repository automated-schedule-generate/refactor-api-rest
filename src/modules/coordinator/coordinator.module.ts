import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoordinatorModel } from '@models';
import { CoordinatorController } from '@controllers';
import { CoordinatorRepository } from '@repositories';
import { CoordinatorRepositoryImpl } from '@repositories.impl';
import { AddCoordinatorUseCase, UpdateCoordinatorUseCase } from '@use-cases';
import { TeacherModule } from '@modules';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([CoordinatorModel]),
    forwardRef(() => TeacherModule),
  ],
  controllers: [CoordinatorController],
  providers: [
    {
      provide: CoordinatorRepository,
      useClass: CoordinatorRepositoryImpl,
    },
    AddCoordinatorUseCase,
    UpdateCoordinatorUseCase,
  ],
  exports: [
    {
      provide: CoordinatorRepository,
      useClass: CoordinatorRepositoryImpl,
    },
  ],
})
export class CoordinatorModule {}
