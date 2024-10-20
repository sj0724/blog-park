import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { formatDateRange, getDateFromDay } from '@/utils/formatData';

interface Props {
  day: number;
  year: number;
}

export default function CalendarSingleDay({ day, year }: Props) {
  const transformDay = getDateFromDay(year, day);
  const formatDate = formatDateRange({ dateString: transformDay });

  return (
    <HoverCard>
      <HoverCardTrigger className='w-3 h-3 border rounded cursor-pointer' />
      <HoverCardContent className='w-fit p-2'>
        <p className='text-sm'>{formatDate}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
