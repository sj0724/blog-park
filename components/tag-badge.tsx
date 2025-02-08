'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  tag: string;
  type: 'badge' | 'button';
}

export default function TagBadge({ tag, type }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    const tagList = url.searchParams.getAll('tags');
    if (tagList.includes(tag)) {
      url.searchParams.delete('tags', tag);
    } else {
      url.searchParams.append('tags', tag);
    }
    router.push(url.toString());
  };

  useEffect(() => {
    const tagList = searchParams.getAll('tags');
    if (tagList.includes(tag)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [searchParams, tag]);

  return (
    <>
      {type === 'badge' ? (
        <div className='px-3 py-1 text-blue-500 bg-gray-100 rounded-full w-fit text-nowrap text-sm'>
          {tag}
        </div>
      ) : (
        <div
          className={`px-3 py-1 ${
            isActive
              ? 'bg-blue-200 hover:bg-blue-300'
              : 'bg-gray-100 hover:bg-gray-200'
          } text-blue-500  rounded-full w-fit cursor-pointer`}
          onClick={onClick}
        >
          {tag}
        </div>
      )}
    </>
  );
}
