import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationModel } from '@models';
import { OrganizationController } from '@controllers';
import { OrganizationRepository } from '@repositories';
import { OrganizationRepositoryImpl } from '@repositories.impl';
import { RegisterOrganizationUseCase } from './application/use-cases/register-organization.use-case';
import { FindAllOrganizationsUseCase } from './application/use-cases/find-all-organizations.use-case';
import { FindOrganizationByIdUseCase } from './application/use-cases/find-organization-by-id.use-case';
import { UpdateOrganizationUseCase } from './application/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from './application/use-cases/delete-organization.use-case';
import { SoftDeleteOrganizationUseCase } from './application/use-cases/soft-delete-organization.use-case';
import { RestoreOrganizationUseCase } from './application/use-cases/restore-organization.use-case';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([OrganizationModel])],
  controllers: [OrganizationController],
  providers: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationRepositoryImpl,
    },
    RegisterOrganizationUseCase,
    FindAllOrganizationsUseCase,
    FindOrganizationByIdUseCase,
    UpdateOrganizationUseCase,
    DeleteOrganizationUseCase,
    SoftDeleteOrganizationUseCase,
    RestoreOrganizationUseCase,
  ],
  exports: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationRepositoryImpl,
    },
  ],
})
export class OrganizationModule {}
