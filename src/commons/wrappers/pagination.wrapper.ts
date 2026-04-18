import { IPagination } from '../interfaces/pagination.interface';

export function paginationWrapper<T>(
  items: T[],
  total: number,
  page: number = 1,
  limit: number = 1,
): IPagination<T> {
  return {
    items,
    total,
    page: {
      current: page,
      total: limit === 1 && page === 1 ? 1 : Math.ceil(total / limit),
    },
  };
}
