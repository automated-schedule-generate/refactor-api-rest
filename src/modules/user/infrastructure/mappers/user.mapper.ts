import { UserEntity } from '@entities';
import { TeacherMapper } from '@mappers';
import { UserModel } from '@models';

export class UserMapper {
  static toEntity(model: UserModel): UserEntity {
    const user = new UserEntity(
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

    if (model?.teacher?.dataValues) {
      user.teacher = TeacherMapper.toEntity(model.teacher.dataValues);
    }

    return user;
  }
}
