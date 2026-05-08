import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationModel } from '@models';
import { OrganizationController } from '@controllers';
import { OrganizationRepository } from '@repositories';
import { OrganizationRepositoryImpl } from '@repositories.impl';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([OrganizationModel])],
  controllers: [OrganizationController],
  providers: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationRepositoryImpl,
    },
  ],
})
export class OrganizationModule {}
