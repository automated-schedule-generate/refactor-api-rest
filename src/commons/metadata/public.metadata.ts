import 'reflect-metadata';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export function Public<T>(...tags: string[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const metadata: any = Reflect.getMetadata(
      'swagger/apiOperation',
      descriptor.value,
    );

    if (metadata) {
      metadata.tags = [...tags, 'public routes'];
    }
    return SetMetadata<string, boolean>(IS_PUBLIC_KEY, true)<T>(
      target,
      propertyKey,
      descriptor,
    );
  };
}
