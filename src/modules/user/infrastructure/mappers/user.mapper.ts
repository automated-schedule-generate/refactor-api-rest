import { UserEntity } from '@entities';
import { UserModel } from '@models';

export class UserMapper {
  static toEntity(model: UserModel): UserEntity {
    return new UserEntity(
      model.id,
      model.name,
      model.email,
      model.password,
      model.cpf,
      model.role,
      model.department,
      model.is_active,
      model.created_at,
      model.updated_at,
    );
  }
}
