import { AuthRepository } from '@repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from '@models';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(@InjectModel(AuthModel) private model: typeof AuthModel) {}
}
