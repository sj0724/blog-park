'use client';

import { Alarm } from '@/type';
import AlarmCard from './alarm-card';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { getMyAlarmList } from '@/app/data/alarm';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import AlarmSkeleton from './alarm-skeleton';

interface Props {
  list: Alarm[];
  userId: string;
  totalCount: number;
}

export default function AlarmContainer({ list, userId, totalCount }: Props) {
  const [alarmList, setAlarmList] = useState(list);
  const [page, setPage] = useState(2);
  const [isNext, setIsNext] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadMoreAnswer = useCallback(async () => {
    startTransition(async () => {
      const result = await getMyAlarmList({ userId, page, limit: 7 });
      setPage(page + 1);
      setAlarmList((prev) => [...prev, ...result.alarms]);
    });
  }, [page, userId]);

  const obsRef = useInfiniteScroll({
    callback: loadMoreAnswer,
    isLoading: isPending,
    isNext,
  });

  useEffect(() => {
    if (totalCount === alarmList.length) {
      setIsNext(false);
    }
  }, [alarmList, totalCount]);

  return (
    <div className='flex flex-col items-center justify-center gap-10 relative'>
      {list.length === 0 ? (
        <div className='flex items-center justify-center gap-5 rounded-lg shadow-lg w-full h-28 px-8 py-4 hover:-translate-y-1 transition-transform text-xl font-semibold bg-white'>
          알림이 없습니다!
        </div>
      ) : (
        <ul className='flex flex-col gap-3 w-full'>
          {alarmList.map((item) => (
            <li key={item.id}>
              <AlarmCard
                id={item.id}
                content={item.content}
                isRead={item.isRead}
                createdAt={item.createdAt}
                user={item.user}
                link={item.routePath}
              />
            </li>
          ))}
          <div ref={obsRef} />
          {isPending && <AlarmSkeleton />}
        </ul>
      )}
    </div>
  );
}
