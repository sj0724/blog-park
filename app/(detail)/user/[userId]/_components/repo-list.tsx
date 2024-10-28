'use client';

import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';

export default function RepoList({ list }: { list: string[] }) {
  const [repo, setRepo] = useState('');

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };

  const connectRepo = () => {
    console.log(repo);
  };

  return (
    <div>
      <ul className='flex flex-col gap-1'>
        {list.map((item) => (
          <li key={item} className='flex items-center gap-3'>
            <input
              id={item}
              type='checkbox'
              value={item}
              checked={repo === item}
              onChange={handleCheckbox}
              className='w-4 h-4'
            />
            <label className='font-semibold text-base' htmlFor={item}>
              {item}
            </label>
          </li>
        ))}
      </ul>
      <div className='w-full flex flex-row-reverse gap-2'>
        <Button type='button' onClick={connectRepo}>
          연동하기
        </Button>
      </div>
    </div>
  );
}
