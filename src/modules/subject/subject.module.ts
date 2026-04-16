import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectModel } from '@models';
import { SubjectController } from '@controllers';
import { SubjectRepository } from '@repositories';
import { SubjectRepositoryImpl } from '@repositories.impl';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([SubjectModel]),
    forwardRef(() => CourseModule),
  ],
  controllers: [SubjectController],
  providers: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: SubjectRepository,
      useClass: SubjectRepositoryImpl,
    },
  ],
})
export class SubjectModule {}
