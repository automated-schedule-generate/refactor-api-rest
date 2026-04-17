import { WorkloadEnum } from '@enums';
import { CoordinatorModel, UserModel } from '@models';
import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';

@Table({ tableName: 'teacher', underscored: true, timestamps: true })
export class TeacherModel extends Model<TeacherModel, Partial<TeacherModel>> {
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  user_id: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  special_need: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  description_special_need: string;

  @Column({ type: DataType.STRING, allowNull: true })
  observation: string;

  @Column({
    type: DataType.ENUM(WorkloadEnum.HR_20, WorkloadEnum.HR_40),
    defaultValue: WorkloadEnum.HR_20,
  })
  workload: WorkloadEnum;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => CoordinatorModel)
  coordinators: CoordinatorModel[];
}
