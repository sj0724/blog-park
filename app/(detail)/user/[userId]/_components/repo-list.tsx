'use client';

import { addGithubLog } from '@/app/action/log';
import { getPrByRepo } from '@/app/data/log';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export default function RepoList({ list }: { list: string[] }) {
  const [repo, setRepo] = useState('');
  const router = useRouter();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };

  const connectRepo = async () => {
    const prList = await getPrByRepo(repo);
    const objectToArr = Object.keys(prList).map((date) => ({
      createdAt: date,
      count: prList[date].count,
      url: prList[date].url,
    }));
    const result = await addGithubLog(objectToArr);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
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
