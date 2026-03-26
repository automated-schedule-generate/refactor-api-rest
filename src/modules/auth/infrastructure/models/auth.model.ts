import { Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'auth' })
export class AuthModel extends Model<AuthModel> {}
