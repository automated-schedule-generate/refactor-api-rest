import { SelectedTimeEnum } from '@enums';
import { PreferenceModel } from '@models';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'preferenceTime' })
export class PreferenceTimeModel extends Model<
  PreferenceTimeModel,
  Partial<PreferenceTimeModel>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(
      SelectedTimeEnum.CLASS_0,
      SelectedTimeEnum.CLASS_1,
      SelectedTimeEnum.CLASS_2,
      SelectedTimeEnum.CLASS_3,
      SelectedTimeEnum.CLASS_4,
      SelectedTimeEnum.CLASS_5,
    ),
    allowNull: false,
  })
  selected: SelectedTimeEnum;

  @ForeignKey(() => PreferenceModel)
  @Column({ type: DataType.UUID, onDelete: 'CASCADE' })
  preference_id: string;

  @BelongsTo(() => PreferenceModel, { hooks: true })
  preference: PreferenceModel;
}
