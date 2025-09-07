export interface GridData<T> {
  items: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
