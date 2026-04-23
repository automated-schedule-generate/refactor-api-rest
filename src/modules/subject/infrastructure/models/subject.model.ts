import {
  CourseModel,
  SemesterModel,
  SubjectTeacherSemesterModel,
  TeacherModel,
} from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  workload: number;

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

  @BelongsToMany(() => TeacherModel, () => SubjectTeacherSemesterModel)
  teachers: TeacherModel[];

  @BelongsToMany(() => SemesterModel, () => SubjectTeacherSemesterModel)
  semesters: SemesterModel[];
}
