import { IPagination } from '../interfaces/pagination.interface';

export function paginationWrapper<T>(
  items: T[],
  total: number,
  page: number = 1,
  limit: number | null = null,
): IPagination<T> {
  return {
    items,
    total,
    page: {
      current: page,
      total:
        limit === null && page === 1 ? 1 : Math.ceil(total / Number(limit)),
    },
  };
}
