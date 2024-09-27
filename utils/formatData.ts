import { formatInTimeZone } from 'date-fns-tz';

const formatDateRange = ({ dateString }: { dateString: string }) => {
  const formattedDate = formatInTimeZone(
    dateString,
    'Asia/Seoul',
    'yyyy년 MM월 dd일'
  );
  return formattedDate;
};

export default formatDateRange;
