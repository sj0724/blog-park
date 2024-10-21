import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Log } from '@/type';
import { formatDateRange, getDateFromDay } from '@/utils/formatData';

interface Props {
  day: number;
  year: number;
  log: Log[];
}

export default function CalendarSingleDay({ day, year, log }: Props) {
  const transformDay = getDateFromDay(year, day);
  const formatDate = formatDateRange({ dateString: transformDay });

  return (
    <HoverCard>
      <HoverCardTrigger
        className={`w-3 h-3 border rounded cursor-pointer ${
          log[0] && 'bg-blue-500 border-blue-500'
        }`}
      />
      <HoverCardContent className='w-fit p-2'>
        <p className='text-sm'>{formatDate}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
