import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  OrganizationModel,
  UserModel,
  UserRoleOrganizationModel,
} from '@models';
import { UserRoleOrganizationController } from '@controllers';
import { UserRoleOrganizationRepository } from '@repositories';
import { UserRoleOrganizationRepositoryImpl } from '@repositories.impl';
import { RoleModel } from '../role/infrastructure/models/role.model';
import { RolePermissionModel } from '../role/infrastructure/models/role-permission.model';
import { PermissionModel } from '../permission/infrastructure/models/permission.model';
import { RegisterUserRoleOrganizationUseCase } from './application/use-cases/register-user-role-organization.use-case';
import { FindAllUserRoleOrganizationUseCase } from './application/use-cases/find-all-user-role-organization.use-case';
import { FindByUserIdUserRoleOrganizationUseCase } from './application/use-cases/find-by-user-id-user-role-organization.use-case';
import { DeleteUserRoleOrganizationUseCase } from './application/use-cases/delete-user-role-organization.use-case';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([
      UserRoleOrganizationModel,
      UserModel,
      OrganizationModel,
      RoleModel,
      RolePermissionModel,
      PermissionModel,
    ]),
  ],
  controllers: [UserRoleOrganizationController],
  providers: [
    {
      provide: UserRoleOrganizationRepository,
      useClass: UserRoleOrganizationRepositoryImpl,
    },
    RegisterUserRoleOrganizationUseCase,
    FindAllUserRoleOrganizationUseCase,
    FindByUserIdUserRoleOrganizationUseCase,
    DeleteUserRoleOrganizationUseCase,
  ],
  exports: [
    {
      provide: UserRoleOrganizationRepository,
      useClass: UserRoleOrganizationRepositoryImpl,
    },
  ],
})
export class UserRoleOrganizationModule {}
