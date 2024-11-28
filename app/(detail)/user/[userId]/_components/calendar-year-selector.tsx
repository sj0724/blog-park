'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const YEAR = [2023, 2024, 2025];

export default function CalendarYearSelector({
  calendarYear,
  changeYear,
}: {
  calendarYear: number;
  changeYear: (value: string) => void;
}) {
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
