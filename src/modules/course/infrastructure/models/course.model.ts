import { ClassTimeEnum } from '@enums';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'course' })
export class CourseModel extends Model<CourseModel, Partial<CourseModel>> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_semesters: number;

  @Column({
    type: DataType.ENUM(ClassTimeEnum.MIN_45, ClassTimeEnum.MIN_60),
    defaultValue: ClassTimeEnum.MIN_45,
  })
  class_time: ClassTimeEnum;
}
