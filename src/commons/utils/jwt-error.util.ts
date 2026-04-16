export function getJwtErrorName(err: unknown): string | null {
  if (typeof err === 'object' && err !== null && 'name' in err) {
    return (err as { name: string }).name;
  }
  return null;
}
