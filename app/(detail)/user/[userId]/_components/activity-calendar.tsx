import { getDayInYear, getFirstDay } from '@/utils/formatData';
import CalendarSingleDay from './calendar-single-day';

const DAYS_KOREAN = ['일', '월', '화', '수', '목', '금', '토'];

export default function ActivityCalendar() {
  const currentYear = new Date().getFullYear();
  const firstDayIndex = getFirstDay(currentYear);
  const totalDay = getDayInYear(currentYear);

  return (
    <div className='flex gap-5 border p-3 rounded-lg'>
      <div className='flex flex-col'>
        {DAYS_KOREAN.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <div className='grid grid-flow-col grid-rows-7 gap-1'>
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={index} className='p-2' />
        ))}
        {Array.from({ length: totalDay }, (_, index) => (
          <CalendarSingleDay key={index} day={index + 1} year={currentYear} />
        ))}
      </div>
    </div>
  );
}
