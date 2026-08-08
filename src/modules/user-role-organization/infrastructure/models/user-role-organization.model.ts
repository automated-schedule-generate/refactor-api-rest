import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';
import { UserModel, OrganizationModel } from '@models';
import { RoleModel } from '../.././../role/infrastructure/models/role.model';

@Table({
  tableName: 'user_role_organization',
  underscored: true,
  timestamps: true,
})
export class UserRoleOrganizationModel extends Model<
  UserRoleOrganizationModel,
  Partial<UserRoleOrganizationModel>
> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv7,
  })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id!: string;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.UUID, allowNull: false })
  role_id!: string;

  @ForeignKey(() => OrganizationModel)
  @Column({ type: DataType.UUID, allowNull: false })
  organization_id!: string;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @BelongsTo(() => RoleModel)
  role!: RoleModel;

  @BelongsTo(() => OrganizationModel)
  organization!: OrganizationModel;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
