import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';
import { PermissionModel } from '@models';
import { RolePermissionModel } from './role-permission.model';

@Table({ tableName: 'roles', underscored: true, timestamps: true })
export class RoleModel extends Model<RoleModel, Partial<RoleModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv7,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  priority!: number;

  @BelongsToMany(() => PermissionModel, () => RolePermissionModel)
  permissions!: PermissionModel[];

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
