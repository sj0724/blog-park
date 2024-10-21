import {
  formatDateTz,
  getDateFromDay,
  getDayInYear,
  getFirstDay,
} from '@/utils/formatData';
import CalendarSingleDay from './calendar-single-day';
import { getLogById } from '@/app/data/log';
import { Log } from '@/type';

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

export default async function ActivityCalendar({ userId }: { userId: string }) {
  const currentYear = new Date().getFullYear();
  const firstDayIndex = getFirstDay(currentYear);
  const totalDay = getDayInYear(currentYear);
  const log = await getLogById({ userId, year: currentYear });

  // 전체 로그 배열을 날짜값을 키값으로 객체 생성
  const logByDate: Record<string, Log[]> = log!.reduce((acc, entry) => {
    const date = formatDateTz(entry.updated_at!);
    acc[date] = acc[date] || [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, Log[]>);

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
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}