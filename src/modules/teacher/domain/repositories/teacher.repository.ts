import { Injectable } from '@nestjs/common';
import { TeacherEntity } from '../entities/teacher.entity';

@Injectable()
export abstract class TeacherRepository {
  abstract register(
    user_id: string,
    special_need: boolean,
    description_special_need?: string,
    observation?: string,
  ): Promise<TeacherEntity>;
  abstract update(
    id: string,
    special_need: boolean,
    description_special_need?: string,
    observation?: string,
  ): Promise<TeacherEntity | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(user_id: string): Promise<TeacherEntity | null>;
  abstract findAll(page: number, limit: number): Promise<TeacherEntity[]>;
}
