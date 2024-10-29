'use client';

import { addGithubLog } from '@/app/action/log';
import { getCommitByRepo } from '@/app/data/log';
import { getSessionUserData } from '@/app/data/user';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  toggleModal: () => void;
  list: string[];
  handlePage: (page: number) => void;
  page: number;
  isNext: boolean;
}

export default function RepoList({
  list,
  toggleModal,
  handlePage,
  page,
  isNext,
}: Props) {
  const [repo, setRepo] = useState('');
  const router = useRouter();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };

  const connectRepo = async () => {
    const session = await getSessionUserData();
    const commitList = await getCommitByRepo(repo);
    const objectToArr = Object.keys(commitList).map((date) => ({
      createdAt: date,
      count: commitList[date].count,
      url: `https://github.com/${session?.name}/${repo}/commits/main/?author=${session?.name}&since=${date}&until=${date}`,
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
    <div className='h-80 flex flex-col justify-between'>
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
      <div className='w-full flex justify-between items-center gap-2'>
        <div className='flex items-center gap-2'>
          <button
            className='w-5'
            disabled={page === 1}
            type='button'
            onClick={() => handlePage(page - 1)}
          >
            <ArrowLeft size={20} color={`${page > 1 ? 'black' : 'gray'}`} />
          </button>
          {page}
          <button
            className='w-5'
            type='button'
            onClick={() => handlePage(page + 1)}
            disabled={!isNext}
          >
            <ArrowRight size={20} color={`${isNext ? 'black' : 'gray'}`} />
          </button>
        </div>
        <Button type='button' onClick={connectRepo}>
          연동하기
        </Button>
      </div>
    </div>
  );
}
