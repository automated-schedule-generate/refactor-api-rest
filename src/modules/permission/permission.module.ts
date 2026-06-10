import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from '@models';
import { PermissionController } from '@controllers';
import { PermissionRepository } from '@repositories';
import { PermissionRepositoryImpl } from '@repositories.impl';
import { RegisterPermissionUseCase } from './application/use-cases/register-permission.use-case';
import { FindAllPermissionsUseCase } from './application/use-cases/find-all-permissions.use-case';
import { FindPermissionByIdUseCase } from './application/use-cases/find-permission-by-id.use-case';
import { UpdatePermissionUseCase } from './application/use-cases/update-permission.use-case';
import { DeletePermissionUseCase } from './application/use-cases/delete-permission.use-case';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([PermissionModel])],
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepository,
      useClass: PermissionRepositoryImpl,
    },
    RegisterPermissionUseCase,
    FindAllPermissionsUseCase,
    FindPermissionByIdUseCase,
    UpdatePermissionUseCase,
    DeletePermissionUseCase,
  ],
  exports: [
    {
      provide: PermissionRepository,
      useClass: PermissionRepositoryImpl,
    },
  ],
})
export class PermissionModule {}
