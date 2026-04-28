import { SemesterModel, SubjectModel, TeacherModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'subject-teacher-semester', timestamps: false })
export class SubjectTeacherSemesterModel extends Model<
  SubjectTeacherSemesterModel,
  Partial<SubjectTeacherSemesterModel>
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  subject_id: string;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  teacher_id: string;

  @ForeignKey(() => SemesterModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  semester_id: string;

  @BelongsTo(() => SubjectModel)
  subject: SubjectModel;

  @BelongsTo(() => TeacherModel)
  teacher: TeacherModel;

  @BelongsTo(() => SemesterModel)
  semester: SemesterModel;
}
