'use client';

import { addGithubLog } from '@/app/action/log';
import { getPrByRepo } from '@/app/data/log';
import { getSessionUserData } from '@/app/data/user';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  toggleModal: () => void;
  list: string[];
}

export default function RepoList({ list, toggleModal }: Props) {
  const [repo, setRepo] = useState('');
  const router = useRouter();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };

  const connectRepo = async () => {
    const session = await getSessionUserData();
    const prList = await getPrByRepo(repo);
    const objectToArr = Object.keys(prList).map((date) => ({
      createdAt: date,
      count: prList[date].count,
      url: `https://github.com/${session?.name}/${repo}/pulls?q=is%3Apr+created%3A${date}+`,
    }));
    const result = await addGithubLog(objectToArr);
    if (result.success) {
      toast.message(result.message);
      toggleModal();
      router.refresh();
    } else {
      toggleModal();
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