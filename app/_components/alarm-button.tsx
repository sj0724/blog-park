'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { getMyalarmCount } from '../data/alarm';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function AlarmButton() {
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
    settingCount();

    const channel = supabase
      .channel('alarm')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alarms',
        },
        () => {
          settingCount();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'alarms',
        },
        () => {
          settingCount();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
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
  }, []);

  return (
    <Link href={'/alarm'}>
      <div className='relative'>
        <Bell size={25} />
        {alarmCount !== 0 && (
          <div className='w-3 h-3 rounded-full bg-blue-600 absolute top-0 -right-0' />
        )}
      </div>
    </Link>
  );
}
