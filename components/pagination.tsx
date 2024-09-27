'use client';

import { useRouter } from 'next/navigation';

interface Props {
  total: number;
  currentPage: number;
  route: string;
}

export default function Pagination({ total, currentPage = 1, route }: Props) {
  const router = useRouter();
  const totalPages = Math.ceil(total / 5);
  const changePage = (page: number) => {
    router.push(`${route}?page=${page}`);
  };

  return (
    <ul className='flex space-x-2'>
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index}>
          <button
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white hover:bg-blue-900'
                : 'bg-gray-200 hover:bg-gray-400'
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
