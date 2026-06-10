import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel, RoleModel } from '@models';
import { RoleController } from '@controllers';
import { RoleRepository } from '@repositories';
import { RoleRepositoryImpl } from '@repositories.impl';
import { RolePermissionModel } from './infrastructure/models/role-permission.model';
import { RegisterRoleUseCase } from './application/use-cases/register-role.use-case';
import { FindAllRolesUseCase } from './application/use-cases/find-all-roles.use-case';
import { FindRoleByIdUseCase } from './application/use-cases/find-role-by-id.use-case';
import { UpdateRoleUseCase } from './application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from './application/use-cases/delete-role.use-case';
import { AddPermissionToRoleUseCase } from './application/use-cases/add-permission-to-role.use-case';
import { RemovePermissionFromRoleUseCase } from './application/use-cases/remove-permission-from-role.use-case';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([
      RoleModel,
      RolePermissionModel,
      PermissionModel,
    ]),
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
    RegisterRoleUseCase,
    FindAllRolesUseCase,
    FindRoleByIdUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    AddPermissionToRoleUseCase,
    RemovePermissionFromRoleUseCase,
  ],
  exports: [
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
  ],
})
export class RoleModule {}
