import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { uuidv7 } from 'uuidv7';

@Table({
  tableName: 'session',
  underscored: true,
  timestamps: true,
})
export class SessionModel extends Model<SessionModel, Partial<SessionModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv7,
  })
  declare id: string;

  @Column({ type: DataType.STRING(2000), allowNull: false })
  token!: string;

  @Column({ type: DataType.STRING(2000), allowNull: false })
  refresh_token!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires_at!: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active!: boolean;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
