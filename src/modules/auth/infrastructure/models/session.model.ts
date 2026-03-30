import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'session',
  underscored: true,
  timestamps: false,
})
export class SessionModel extends Model<SessionModel, Partial<SessionModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING(2000), allowNull: false })
  token: string;

  @Column({ type: DataType.STRING(2000), allowNull: false })
  refresh_token: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires_at: Date;
}
