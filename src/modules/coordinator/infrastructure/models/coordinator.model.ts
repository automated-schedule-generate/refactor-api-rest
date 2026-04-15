import { TeacherModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'coordinator' })
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
  })
  teacher_id: string;

  @BelongsTo(() => TeacherModel)
  teacher: TeacherModel;
}
