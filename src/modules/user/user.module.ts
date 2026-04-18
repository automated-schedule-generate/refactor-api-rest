import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '@models';
import { UserController } from '@controllers';
import { UserRepository } from '@repositories';
import { UserRepositoryImpl } from '@repositories.impl';
import {
  FindAllUserUseCase,
  RegisterUserUseCase,
  UpdateUserUseCase,
} from '@use-cases';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    RegisterUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUserUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
