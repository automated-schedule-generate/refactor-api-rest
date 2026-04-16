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
    onDelete: 'CASCADE',
  })
  user_id: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  special_need: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  description_special_need: string;

  @Column({ type: DataType.STRING, allowNull: true })
  observation: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => CoordinatorModel)
  coordinators: CoordinatorModel[];
}
