'use client';

import { Log } from '@/type';
import { formatDateRange, getDateFromDay } from '@/utils/formatData';
import { useState } from 'react';

interface Props {
  day: number;
  year: number;
  log: Log[];
}

export default function CalendarSingleDay({ day, year, log }: Props) {
  const [isHover, setIsHover] = useState(false);
  const transformDay = getDateFromDay(year, day);
  const formatDate = formatDateRange({ dateString: transformDay });
  const logColor = (rate: number) => {
    if (50 > rate && rate !== 0) {
      return 'bg-blue-100 border-blue-100';
    }
    if (rate >= 50 && rate < 100) {
      return 'bg-blue-300 border-blue-300';
    }
    if (rate >= 100) {
      return 'bg-blue-500 border-blue-500';
    }
    return 'bg-none border';
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`w-3 h-3 border rounded cursor-pointer ${
          log[0] && logColor(log[0].rate!)
        }`}
      />
      <div
        className={`${
          isHover ? 'flex scale-100' : 'scale-0'
        } absolute top-0 origin-top-left z-10 bg-white shadow-md flex-col w-32 h-fit p-2 gap-1 rounded-md transition-transform duration-900 translate-x-4`}
      >
        <p className='text-sm font-semibold text-nowrap'>{formatDate}</p>
        <div className='text-sm font-semibold text-gray-600'>
          <p>포스트 : {log[0] ? log[0].post_count : 0}회</p>
          <p>댓글 : {log[0] ? log[0].comment_count : 0}회</p>
          <p>좋아요 : {log[0] ? log[0].like_count : 0}회</p>
        </div>
      </div>
    </div>
  );
}
