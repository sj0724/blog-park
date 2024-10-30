'use client';

import { Log } from '@/type';
import { formatDateRange, getDateFromDay } from '@/utils/formatData';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Props {
  day: number;
  year: number;
  log: Log[];
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

type DirectionStyle = {
  [key: string]: string;
};

const directionStyle: DirectionStyle = {
  right: 'origin-top-left translate-x-4',
  left: 'origin-top-right right-0 -translate-x-4',
  top: 'top-0',
  bottom: 'bottom-0',
  center: 'top-0 -translate-y-1/2',
};

export default function CalendarSingleDay({
  day,
  year,
  log,
  containerRef,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const [xDirection, setXDirection] = useState('right');
  const [yDirection, setYDirection] = useState('top');
  const infoRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const transformDay = getDateFromDay(year, day);
  const formatDate = formatDateRange({ dateString: transformDay });
  const logColor = (rate: number) => {
    if (50 >= rate && rate !== 0) {
      return 'bg-blue-100 border-blue-100';
    }
    if (rate >= 50 && rate < 50) {
      return 'bg-blue-300 border-blue-300';
    }
    if (rate >= 100) {
      return 'bg-blue-500 border-blue-500';
    }
    return 'bg-none border';
  };

  useEffect(() => {
    if (containerRef.current && infoRef.current) {
      const child = infoRef.current.getBoundingClientRect(); //로그 기록 위치
      const parent = containerRef.current.getBoundingClientRect(); // 컨테이너 위치
      const leftPosition = child.left - parent.left; // 컨테이너 기준 로그 태그 좌측 포지션
      const topPosition = child.top - parent.top; // 컨테이너 기준 로그 태그 상단 포지션
      if (leftPosition > parent.width - 130) {
        // 컨테이너 넓이 - 로그 태그 넓이
        setXDirection('left');
      }
      if (topPosition > parent.height - 130) {
        setYDirection('center');
      }
      if (topPosition > parent.height - 100) {
        // 컨테이너 높이 - 로그 태그 높이
        setYDirection('bottom');
      }
    }
  }, [containerRef]);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (
        infoRef.current &&
        !infoRef.current.contains(e.target as Node) &&
        boxRef.current &&
        !boxRef.current.contains(e.target as Node)
      ) {
        setIsHover(!isHover);
      }
    };

    if (isHover) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isHover]);

  return (
    <div className='relative'>
      <div
        ref={boxRef}
        className={`w-3 h-3 border rounded cursor-pointer hover:bg-gray-300 hover:border-gray-300 ${
          log[0] && logColor(log[0].rate!)
        }`}
        onClick={() => setIsHover(!isHover)}
      />
      <div
        ref={infoRef}
        className={`${isHover ? 'flex scale-100' : 'scale-0'} absolute z-10 ${
          directionStyle[xDirection]
        } ${
          directionStyle[yDirection]
        } bg-white shadow-md flex-col w-32 h-fit p-2 gap-1 rounded-md transition-transform duration-900`}
      >
        <p className='text-sm font-semibold text-nowrap'>{formatDate}</p>
        <div className='text-sm font-semibold text-gray-600'>
          <p>포스트 : {log[0] ? log[0].post_count : 0}회</p>
          <p>댓글 : {log[0] ? log[0].comment_count : 0}회</p>
          <p>좋아요 : {log[0] ? log[0].like_count : 0}회</p>
          <div className='flex gap-1 items-center w-full justify-between'>
            <p className='text-nowrap'>
              Commit : {log[0] ? log[0].pr_count : 0}회
            </p>
            {log[0] && log[0].pr_url && (
              <Link href={log[0].pr_url} target='_blank'>
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
