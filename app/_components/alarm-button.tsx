'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { getMyalarmCount } from '../data/alarm';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function AlarmButton({ userId }: { userId?: string }) {
  const [alarmCount, setAlarmCount] = useState(0);

  const settingCount = async () => {
    const result = await getMyalarmCount();
    if (result) {
      setAlarmCount(result);
    } else {
      setAlarmCount(0); // count가 0일때 조건 처리
    }
  };

  useEffect(() => {
    if (userId) {
      settingCount();
    }

    const channel = supabase
      .channel('alarm')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alarms',
        },
        () => {
          settingCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <Link href={'/alarm'}>
      <div className='relative hover:-translate-y-1 transition-transform'>
        <Bell size={25} />
        {alarmCount !== 0 && (
          <span className='absolute flex h-3 w-3 top-0 right-0'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
          </span>
        )}
      </div>
    </Link>
  );
}
