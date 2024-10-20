import { getDayInYear, getFirstDay } from '@/utils/formatData';
import CalendarSingleDay from './calendar-single-day';

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

export default function ActivityCalendar() {
  const currentYear = new Date().getFullYear();
  const firstDayIndex = getFirstDay(currentYear);
  const totalDay = getDayInYear(currentYear);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-semibold'>활동 내역</p>
      <div className='flex flex-col gap-3 border p-3 rounded-lg max-w-[800px] overflow-x-auto'>
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
        <div className='flex gap-5'>
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
            {Array.from({ length: totalDay }, (_, index) => (
              <CalendarSingleDay
                key={index}
                day={index + 1}
                year={currentYear}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
