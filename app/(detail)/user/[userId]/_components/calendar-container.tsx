'use client';

import {
  formatDateTz,
  getDateFromDay,
  getDayInYear,
  getFirstDay,
} from '@/utils/formatData';
import CalendarSingleDay from './calendar-single-day';
import { Log } from '@/type';
import { useRef } from 'react';

const DAYS_KOREAN = ['일', '월', '화', '수', '목', '금', '토'];

const MONTHS_KOREAN = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export default function CalendarContainer({
  log,
  currentYear,
}: {
  log: Log[];
  currentYear: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstDayIndex = getFirstDay(currentYear);
  const totalDay = getDayInYear(currentYear);

  const logByDate: Record<string, Log[]> = log!.reduce((acc, entry) => {
    const date = formatDateTz(entry.created_at!);
    acc[date] = acc[date] || [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, Log[]>);

  return (
    <div
      className='flex flex-col gap-3 border p-3 rounded-lg w-full overflow-x-auto'
      ref={containerRef}
    >
      <div className='ml-8 flex gap-12'>
        {MONTHS_KOREAN.map((item) => (
          <div
            key={item}
            className='text-sm text-nowrap text-gray-400 font-semibold'
          >
            {item}
          </div>
        ))}
      </div>
      <div className='flex gap-5 w-full'>
        <div className='flex flex-col'>
          {DAYS_KOREAN.map((item) => (
            <div key={item} className='text-sm text-gray-400 font-semibold'>
              {item}
            </div>
          ))}
        </div>
        <div className='grid grid-flow-col grid-rows-7 gap-1 pr-3'>
          {Array.from({ length: firstDayIndex }).map((_, index) => (
            <div key={index} className='w-3 h-3' />
          ))}
          {Array.from({ length: totalDay }, (_, index) => {
            // 위에서 만들어진 객체에서 같은 날짜에 있는 프로퍼티값을 props로 전달
            const day = index + 1;
            const dayByYear = getDateFromDay(currentYear, day); // 현재 연도에서 해당 일수의 날짜로 변환
            const formatDate = formatDateTz(dayByYear); // 날짜를 시간 제외한 포멧으로 변경
            const matchLog = logByDate[formatDate] || [];

            return (
              <CalendarSingleDay
                key={day}
                day={day}
                year={currentYear}
                log={matchLog}
                containerRef={containerRef}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
