'use client';

interface Props {
  total: number;
  currentPage: number;
  onClick: (page: number) => void;
  limit: number;
}

export default function CommentPagination({
  total,
  currentPage = 1,
  onClick,
  limit,
}: Props) {
  const totalPages = Math.ceil(total / limit);
  const maxVisibleButtons = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxVisibleButtons / 2)
  );
  const pageArr = Array.from(
    { length: Math.min(maxVisibleButtons, totalPages) },
    (_, index) => startPage + index
  ).filter((page) => page <= totalPages);

  return (
    <ul className='flex space-x-2'>
      {pageArr.map((page) => (
        <li key={page}>
          <button
            onClick={() => onClick(page)}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${
              currentPage === page
                ? 'bg-blue-500 text-white hover:bg-blue-900'
                : 'bg-gray-200 hover:bg-gray-400'
            }`}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}
