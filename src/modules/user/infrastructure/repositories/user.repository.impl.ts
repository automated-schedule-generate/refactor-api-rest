import { UserRepository } from '@repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@models';
import { UserEntity } from '@entities';
import { UserMapper } from '@mappers';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(UserModel) private model: typeof UserModel) {}

  async create(
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): Promise<UserEntity> {
    const user = await this.model.create({
      name,
      email,
      password,
      cpf,
    });
    return UserMapper.toEntity(user.dataValues);
  }

  async update(
    id: string,
    name: string,
    email: string,
    password?: string,
    cpf?: string,
  ): Promise<UserEntity> {
    const [, user] = await this.model.update(
      {
        name,
        email,
        password,
        cpf,
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (!user?.[0].dataValues) {
      throw new BadRequestException('User not found');
    }

    return UserMapper.toEntity(user[0].dataValues);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({
      where: { id },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.model.findByPk(id);
    if (!user) {
      return null;
    }
    return UserMapper.toEntity(user.dataValues);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.model.findAll();
    return users.map((user) => UserMapper.toEntity(user.dataValues));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({
      where: { email },
    });
    if (!user?.dataValues) {
      return null;
    }
    return UserMapper.toEntity(user.dataValues);
  }

  async findByCpf(cpf: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({
      where: { cpf },
    });
    if (!user?.dataValues) {
      return null;
    }
    return UserMapper.toEntity(user.dataValues);
  }
}
