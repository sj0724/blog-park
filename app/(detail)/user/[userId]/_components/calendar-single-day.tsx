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
      <HoverCardTrigger className='w-4 h-4 border rounded-md cursor-pointer' />
      <HoverCardContent>{formatDate}</HoverCardContent>
    </HoverCard>
  );
}
