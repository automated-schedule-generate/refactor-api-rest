import 'reflect-metadata';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export function Public<T>(...tags: string[]) {
  return (target, propertyKey, descriptor) => {
    const metadata = Reflect.getMetadata(
      'swagger/apiOperation',
      descriptor.value,
    );

    if (metadata) {
      if (Array.isArray(metadata?.tags)) {
        metadata.tags.push('public routes');
      } else {
        metadata.tags = [...tags, 'public routes'];
      }
    }
    return SetMetadata<string, boolean>(IS_PUBLIC_KEY, true)<T>(
      target,
      propertyKey,
      descriptor,
    );
  };
}
