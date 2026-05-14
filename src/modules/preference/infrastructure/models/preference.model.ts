import { DayPreferenceEnum, TurnPreferenceEnum } from '@enums';
import { PreferenceTimeModel, TeacherModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

@Table({ tableName: 'preference', underscored: true, timestamps: false })
export class PreferenceModel extends Model<
  PreferenceModel,
  Partial<PreferenceModel>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(
      DayPreferenceEnum.MONDAY,
      DayPreferenceEnum.TUESDAY,
      DayPreferenceEnum.WEDNESDAY,
      DayPreferenceEnum.THURSDAY,
      DayPreferenceEnum.FRIDAY,
    ),
    allowNull: false,
  })
  day: DayPreferenceEnum;

  @Column({
    type: DataType.ENUM(
      TurnPreferenceEnum.MORNING,
      TurnPreferenceEnum.AFTERNOON,
      TurnPreferenceEnum.NIGHT,
    ),
    allowNull: false,
  })
  turn: TurnPreferenceEnum;

  @ForeignKey(() => TeacherModel)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  user_id: string;

  @BelongsTo(() => TeacherModel)
  teacher: TeacherModel;

  @HasMany(() => PreferenceTimeModel)
  preferenceTimes: PreferenceTimeModel[];
}
