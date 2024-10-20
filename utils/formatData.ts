import { formatInTimeZone } from 'date-fns-tz';

export const formatDateRange = ({ dateString }: { dateString: string }) => {
  const formattedDate = formatInTimeZone(
    dateString,
    'Asia/Seoul',
    'yyyy년 MM월 dd일'
  );
  return formattedDate;
};

export const getFirstDay = (year: number) => {
  const firstDay = new Date(year, 0, 1);
  return firstDay.getDate();
};
