import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from '@models';
import { AuthController } from '@controllers';
import { AuthRepository } from '@repositories';
import { AuthRepositoryImpl } from '@repositories.impl';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([AuthModel])],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class AuthModule {}
