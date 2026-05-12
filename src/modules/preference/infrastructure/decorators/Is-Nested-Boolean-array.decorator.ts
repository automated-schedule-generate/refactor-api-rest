import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNestedBooleanArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNestedBooleanArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) return false;
          return value.every(
            (inner) =>
              Array.isArray(inner) &&
              inner.length <= 6 &&
              inner.every((v) => typeof v === 'boolean'),
          );
        },
        defaultMessage() {
          return 'Each inner array must contain at most 6 booleans';
        },
      },
    });
  };
}
