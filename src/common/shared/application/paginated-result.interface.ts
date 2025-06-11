export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  limit: number;
}
