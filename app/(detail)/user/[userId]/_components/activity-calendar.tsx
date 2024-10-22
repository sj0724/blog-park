import { getLogById } from '@/app/data/log';
import CalendarContainer from './calendar-container';
import SummaryConatiner from './summary-container';

export default async function ActivityCalendar({ userId }: { userId: string }) {
  const currentYear = new Date().getFullYear();
  const log = await getLogById({ userId, year: currentYear });

  return (
    <div className='flex flex-col gap-4 w-full max-w-[800px]'>
      <p className='text-2xl font-semibold block w-full'>활동 내역</p>
      <div className='flex items-center gap-4'>
        <SummaryConatiner userId={userId} />
        <CalendarContainer log={log ? log : []} currentYear={currentYear} />
      </div>
    </div>
  );
}
