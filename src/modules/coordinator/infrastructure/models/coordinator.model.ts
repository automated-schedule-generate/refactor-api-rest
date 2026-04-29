import { TeacherModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'coordinator', timestamps: true, underscored: true })
export class CoordinatorModel extends Model<
  CoordinatorModel,
  Partial<CoordinatorModel>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  end: Date | null;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  teacher_id: string;

  @BelongsTo(() => TeacherModel)
  teacher: TeacherModel;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
