// utils/get-grid-data.ts
import { GridData, Pagination } from "@/types/pagination-interface";

export interface GetGridDataProps<T> {
  data: T[];
  page: number;
  perPage: number;
  totalCount: number;
}

/**
 * 안전한 페이지네이션 메타 생성:
 * - perPage <= 0 처리
 * - page 범위 보정(1..totalPages)
 */
export function getGridData<T>({
  data,
  page,
  perPage,
  totalCount,
}: GetGridDataProps<T>): GridData<T> {
  const safePerPage = Number.isFinite(perPage) && perPage > 0 ? Math.floor(perPage) : 20;
  const totalPages = safePerPage > 0 ? Math.ceil(totalCount / safePerPage) : 0;

  const safePageBase = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePage = totalPages === 0 ? 1 : Math.min(Math.max(1, safePageBase), totalPages);

  const pagination: Pagination = {
    page: safePage,
    perPage: safePerPage,
    totalCount,
    totalPages,
    hasPrev: totalPages > 0 && safePage > 1,
    hasNext: totalPages > 0 && safePage < totalPages,
  };

  return { items: data, pagination };
}
