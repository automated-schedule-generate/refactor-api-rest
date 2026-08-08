import { ClassTimeEnum } from '@enums';
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';

@Table({ tableName: 'course', timestamps: true, underscored: true })
export class CourseModel extends Model<CourseModel, Partial<CourseModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv7,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_semesters!: number;

  @Column({
    type: DataType.ENUM(ClassTimeEnum.MIN_45, ClassTimeEnum.MIN_60),
    defaultValue: ClassTimeEnum.MIN_45,
  })
  class_time!: ClassTimeEnum;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active!: boolean;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
