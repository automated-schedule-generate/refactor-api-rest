import { HttpException } from '@nestjs/common';

export class DomainException extends Error {
  public readonly name: string;
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'DomainException';
    this.code = code;
  }

  toHttpException(): HttpException {
    throw new HttpException({ message: this.message, code: this.code }, 400);
  }
}
