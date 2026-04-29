import { TeacherModel } from '@models';
import {
  Table,
  Model,
  DataType,
  Column,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';

@Table({ tableName: 'user', underscored: true, timestamps: true })
export class UserModel extends Model<UserModel, Partial<UserModel>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING, unique: true })
  cpf: string;

  @Column({ type: DataType.STRING, allowNull: true })
  role?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  department?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasOne(() => TeacherModel)
  teacher: TeacherModel;
}
