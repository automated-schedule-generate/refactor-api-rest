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
      SelectedTimeEnum.AULA_0,
      SelectedTimeEnum.AULA_1,
      SelectedTimeEnum.AULA_2,
      SelectedTimeEnum.AULA_3,
      SelectedTimeEnum.AULA_4,
      SelectedTimeEnum.AULA_5,
    ),
    allowNull: false,
  })
  selected: SelectedTimeEnum;

  @ForeignKey(() => PreferenceModel)
  declare preferenceId: string;

  @BelongsTo(() => PreferenceModel)
  declare preference: PreferenceModel;
}
