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

@Table({ tableName: 'preference' })
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
      DayPreferenceEnum.SEGUNDA,
      DayPreferenceEnum.TERCA,
      DayPreferenceEnum.QUARTA,
      DayPreferenceEnum.QUINTA,
      DayPreferenceEnum.SEXTA,
    ),
    allowNull: false,
  })
  day: DayPreferenceEnum;

  @Column({
    type: DataType.ENUM(
      TurnPreferenceEnum.MATUTINO,
      TurnPreferenceEnum.VESPERTINO,
      TurnPreferenceEnum.NOTURNO,
    ),
    allowNull: false,
  })
  turn: TurnPreferenceEnum;

  @ForeignKey(() => TeacherModel)
  @Column(DataType.UUID)
  teacherId: string;

  @BelongsTo(() => TeacherModel)
  teacher: TeacherModel;

  @HasMany(() => PreferenceTimeModel)
  preferenceTimes: PreferenceTimeModel[];
}
