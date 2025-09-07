"use client";

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/types/pagination-interface";

interface AdminConfigPostPaginationProps {
  pagination: Pagination;
}

function buildPages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);

  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  pages.add(2);
  pages.add(total - 1);

  return Array.from(pages).sort((a, b) => a - b);
}

const AdminConfigPostPagination = ({ pagination }: AdminConfigPostPaginationProps) => {
  const { page, totalPages, hasPrev, hasNext, perPage } = pagination;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const go = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", String(nextPage));
    params.set("perPage", String(perPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = buildPages(page, totalPages);

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious aria-disabled={!hasPrev} onClick={() => hasPrev && go(page - 1)} />
        </PaginationItem>

        {pages.map((p, idx) => {
          const prev = pages[idx - 1];
          const showEllipsis = prev !== undefined && p - prev > 1;

          return (
            <span key={`p-${p}-${idx}`} className="flex">
              {showEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink isActive={p === page} onClick={() => go(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            </span>
          );
        })}

        <PaginationItem>
          <PaginationNext aria-disabled={!hasNext} onClick={() => hasNext && go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default AdminConfigPostPagination;
