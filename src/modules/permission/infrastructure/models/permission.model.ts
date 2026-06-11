import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';

@Table({ tableName: 'permissions', underscored: true, timestamps: true })
export class PermissionModel extends Model<
  PermissionModel,
  Partial<PermissionModel>
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv7,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  path: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
