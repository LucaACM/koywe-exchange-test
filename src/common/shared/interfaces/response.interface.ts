export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface PaginatedResponse<T> {
  status: number;
  data: {
    items: T[];
    totalItems: number;
    limit: number;
  };
}
