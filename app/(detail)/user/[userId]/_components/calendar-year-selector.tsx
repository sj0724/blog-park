'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const YEAR = [2023, 2024, 2025];

export default function CalendarYearSelector({
  calendarYear,
}: {
  calendarYear: number;
}) {
  const router = useRouter();

  const changeYear = (value: string) => {
    const url = new URL(window.location.href);
    const isUrl = url.searchParams.get('year');
    if (isUrl) {
      url.searchParams.set('year', value);
    } else {
      url.searchParams.append('year', value);
    }
    router.push(url.toString());
  };

  return (
    <Select onValueChange={changeYear}>
      <SelectTrigger className='w-[100px] font-semibold text-gray-600'>
        <SelectValue
          placeholder={calendarYear}
          className='font-semibold text-gray-600'
          onChange={() => console.log(11)}
        />
      </SelectTrigger>
      <SelectContent>
        {YEAR.map((item) => (
          <SelectItem key={item} value={String(item)}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
