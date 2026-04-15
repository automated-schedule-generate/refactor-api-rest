import { TeacherEntity } from '@entities';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public cpf: string,
    public role: string = '',
    public department: string = '',
    public is_active: boolean = true,
    public created_at: Date,
    public updated_at: Date,
    public teacher?: TeacherEntity,
  ) {}

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
