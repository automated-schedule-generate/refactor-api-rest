import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNestedBooleanArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNestedBooleanArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!value || !Array.isArray(value) || value.length !== 5)
            return false;
          return value.every(
            (inner: unknown) =>
              Array.isArray(inner) &&
              inner.length === 6 &&
              inner.every((v) => typeof v === 'boolean'),
          );
        },
        defaultMessage() {
          return 'Each inner array must contain exactly 6 booleans';
        },
      },
    });
  };
}
