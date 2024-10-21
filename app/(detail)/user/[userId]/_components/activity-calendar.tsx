import { getLogById } from '@/app/data/log';
import CalendarContainer from './calendar-container';

export default async function ActivityCalendar({ userId }: { userId: string }) {
  const currentYear = new Date().getFullYear();
  const log = await getLogById({ userId, year: currentYear });

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-semibold'>활동 내역</p>
      <CalendarContainer log={log ? log : []} currentYear={currentYear} />
    </div>
  );
}
