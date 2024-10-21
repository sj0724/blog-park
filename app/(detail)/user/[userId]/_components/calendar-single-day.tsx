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
  const logColor = (rate: number) => {
    if (50 > rate && rate !== 0) {
      return 'bg-blue-100 border-blue-100';
    }
    if (rate >= 50 && rate < 100) {
      return 'bg-blue-300 border-blue-300';
    }
    if (rate >= 100) {
      return 'bg-blue-500 border-blue-500';
    }
    return 'bg-none border';
  };

  return (
    <HoverCard>
      <HoverCardTrigger
        className={`w-3 h-3 border rounded cursor-pointer ${
          log[0] && logColor(log[0].rate!)
        }`}
      />
      <HoverCardContent className='flex flex-col w-fit p-2 gap-1'>
        <p className='text-sm font-semibold'>{formatDate}</p>
        <div className='text-sm font-semibold text-gray-500'>
          <p>포스트 : {log[0] ? log[0].post_count : 0}</p>
          <p>댓글 : {log[0] ? log[0].comment_count : 0}</p>
          <p>좋아요 : {log[0] ? log[0].like_count : 0}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
