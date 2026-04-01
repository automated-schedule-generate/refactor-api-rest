import { Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  private readonly logger = new Logger(IsCpfConstraint.name);

  validate(value: any) {
    if (typeof value !== 'string') return false;
    // Se máscara for exigida, verificar regex exata
    const maskRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const original = value;
    if (!maskRegex.test(original)) {
      // Formato mascarado incorreto
      return false;
    }
    this.logger.log('cheguei aqui 1');
    // Remover máscara (manter apenas dígitos)
    const cpf = value.replace(/\D/g, '');
    // Verificar comprimento
    if (cpf.length !== 11) return false;
    this.logger.log('cheguei aqui 2');
    // Verificar dígitos repetidos (todos iguais)
    const firstDigit = cpf.charCodeAt(0);
    if ([...cpf].every((c) => c.charCodeAt(0) === firstDigit)) {
      return false;
    }
    this.logger.log('cheguei aqui 3');
    // Calcular 1º dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (cpf.charCodeAt(i) - 48) * (10 - i);
    }
    let rem = sum % 11;
    const dig1 = rem < 2 ? 0 : 11 - rem;
    if (dig1 !== cpf.charCodeAt(9) - 48) return false;
    this.logger.log('cheguei aqui 4');
    // Calcular 2º dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += (cpf.charCodeAt(i) - 48) * (11 - i);
    }
    rem = sum % 11;
    const dig2 = rem < 2 ? 0 : 11 - rem;
    if (dig2 !== cpf.charCodeAt(10) - 48) return false;

    this.logger.log('cheguei aqui 5');

    return true;
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}

// Decorator que registra o validador acima
export function IsCpfValidator(
  requireMask?: boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCpfConstraint,
    });
  };
}
