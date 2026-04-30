import { ShiftEnum } from '@enums';
import { CourseModel, SemesterModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'class', underscored: true, timestamps: true })
export class ClassModel extends Model<ClassModel, Partial<ClassModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  identify?: string;

  @Column({
    type: DataType.ENUM(...Object.values(ShiftEnum)),
    allowNull: false,
  })
  shift: ShiftEnum;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_semester: number;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;

  @BelongsTo(() => CourseModel)
  course: CourseModel;

  @ForeignKey(() => SemesterModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  semester_id: string;

  @BelongsTo(() => SemesterModel)
  semester: SemesterModel;

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
