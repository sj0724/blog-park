import { formatInTimeZone } from 'date-fns-tz';

const formatDateRange = ({ dateString }: { dateString: string }) => {
  const formattedDate = formatInTimeZone(
    dateString,
    'Asia/Seoul',
    'yyyy.MM.dd'
  );
  return formattedDate;
};

export default formatDateRange;
