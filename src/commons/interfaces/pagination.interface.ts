export interface IPagination<T> {
  items: T[];
  total: number;
  page: {
    current: number;
    total: number;
  };
}
