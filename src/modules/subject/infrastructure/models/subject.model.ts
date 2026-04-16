import { WorkloadEnum } from '@enums';
import { CourseModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'subject' })
export class SubjectModel extends Model<SubjectModel, Partial<SubjectModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(WorkloadEnum)),
    allowNull: false,
  })
  workload: WorkloadEnum;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_optional: boolean;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    onDelete: 'SET NULL',
  })
  prerequisite_id: string;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  course_id: string;

  @BelongsTo(() => SubjectModel)
  prerequisite: SubjectModel;

  @BelongsTo(() => CourseModel)
  course: CourseModel;
}
