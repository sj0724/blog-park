import { getLogById } from '@/app/data/log';
import CalendarContainer from './calendar-container';
import SummaryConatiner from './summary-container';

interface Props {
  year: string | null;
  userId: string;
}

export default async function ActivityCalendar({ userId, year }: Props) {
  const currentYear = year ? Number(year) : new Date().getFullYear();
  const log = await getLogById({ userId, year: currentYear });

  return (
    <div className='flex flex-col md:flex-row lg:flex-row w-full items-center gap-4'>
      <SummaryConatiner userId={userId} />
      <CalendarContainer log={log ? log : []} currentYear={currentYear} />
    </div>
  );
}
