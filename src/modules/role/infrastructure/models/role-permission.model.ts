import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { PermissionModel } from '@models';
import { RoleModel } from './role.model';

@Table({ tableName: 'role_permissions', underscored: true, timestamps: false })
export class RolePermissionModel extends Model<
  RolePermissionModel,
  Partial<RolePermissionModel>
> {
  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.UUID, allowNull: false })
  role_id: string;

  @ForeignKey(() => PermissionModel)
  @Column({ type: DataType.UUID, allowNull: false })
  permission_id: string;
}
