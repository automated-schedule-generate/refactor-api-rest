import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  BeforeUpdate,
} from 'sequelize-typescript';
import { UserModel } from '@models';

@Table({ tableName: 'organization', underscored: true, timestamps: true })
export class OrganizationModel extends Model<
  OrganizationModel,
  Partial<OrganizationModel>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BeforeUpdate
  static validateBeforeUpdate(instance: OrganizationModel) {
    if (!instance.is_active) {
      throw new Error(`Item cannot be updated because it is not active`);
    }
  }
}
