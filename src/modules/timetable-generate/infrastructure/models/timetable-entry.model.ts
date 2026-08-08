import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';
import { ShiftEnum } from '@enums';

@Table({
  tableName: 'timetable_entry',
  underscored: true,
  timestamps: true,
})
export class TimetableEntryModel extends Model<
  TimetableEntryModel,
  Partial<TimetableEntryModel>
> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: uuidv7 })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  timetable_id!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  course_id!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  course_semester!: number;

  @Column({
    type: DataType.ENUM(ShiftEnum.MORNING, ShiftEnum.AFTERNOON),
    allowNull: true,
  })
  shift!: ShiftEnum | null;

  @Column({ type: DataType.STRING(1), allowNull: true })
  day!: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  slot_index!: number | null;

  @Column({ type: DataType.UUID, allowNull: false })
  subject_id!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  teacher_id!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  subject_name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  teacher_name!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active!: boolean;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
