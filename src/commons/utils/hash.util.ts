import { Logger } from '@nestjs/common';
import * as argon2 from 'argon2';

export class HashUtil {
  private static readonly logger = new Logger(HashUtil.name);

  static async hash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao gerar hash');
    }
  }

  static async compare(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao verificar hash');
    }
  }
}
