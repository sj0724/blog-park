'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

interface Props {
  total: number;
  currentPage: number;
  route: string;
  limit: number;
}

export default function BlogPagination({
  total,
  currentPage = 1,
  route,
  limit,
}: Props) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);
  const changePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    return `${route}?${newSearchParams.toString()}`;
  };

  const maxVisibleButtons = 5;
  const half = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxVisibleButtons - 1;

  // endPage가 totalPages를 초과하면 조정
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const pageArr = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious href={changePage(currentPage - 1)} />
          </PaginationItem>
        )}
        {pageArr.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={changePage(page)}
              isActive={currentPage === page}
              className='hover:text-blue-500 font-semibold'
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext href={changePage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
