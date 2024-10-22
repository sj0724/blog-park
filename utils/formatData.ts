import { formatInTimeZone } from 'date-fns-tz';

export const formatDateRange = ({
  dateString,
}: {
  dateString: string | Date;
}) => {
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

export const getDayInYear = (year: number) => {
  const firstDay = Number(new Date(year, 0, 1));
  const secondeDay = Number(new Date(year + 1, 0, 1));
  const dayInYear = (secondeDay - firstDay) / (1000 * 60 * 60 * 24);
  return dayInYear;
};

export const getDateFromDay = (year: number, day: number) => {
  const date = new Date(year, 0);
  date.setDate(day);
  return date;
};

export const formatDateTz = (date: Date | string) => {
  const formattedDate = formatInTimeZone(date, 'Asia/Seoul', 'yyyy-MM-dd');
  return formattedDate;
};
