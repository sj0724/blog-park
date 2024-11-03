'use client';

import { deleteAlarm, toggleAlarm } from '@/app/action/alarm';
import { UserAvatar } from '@/components/user-avatar';
import { Alarm } from '@/type';
import calculateDate from '@/utils/calculateData';
import { Circle, CircleCheckBig, X } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  alarm: Alarm;
  editList: (alarmId: string) => void;
}

export default function AlarmCard({ alarm, editList }: Props) {
  const [readAlarm, setReadAlarm] = useState(alarm.isRead);
  const calculateData = calculateDate(alarm.createdAt ? alarm.createdAt : '');
  const handleRead = async (e: MouseEvent) => {
    e.preventDefault();
    setReadAlarm(!readAlarm);
    const result = await toggleAlarm(alarm.id);
    toast.message(result.message);
  };
  const isDelete = async (e: MouseEvent) => {
    e.preventDefault();
    const result = await deleteAlarm(alarm.id);
    editList(alarm.id);
    toast.message(result.message);
  };

  return (
    <Link href={alarm.routePath ? alarm.routePath : '/'}>
      <div
        className={`relative rounded-lg flex flex-col py-3 px-5 shadow hover:shadow-lg hover:-translate-y-1 transition-transform w-full ${
          readAlarm ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <div className='flex gap-1'>
          <div className='flex items-center gap-2 text-sm'>
            <UserAvatar image={alarm.user.image} size='sm' />
            <div className='flex items-center'>
              <p className='text-wrap'>
                <span className='font-semibold'>{alarm.user.name}</span>
                {`님이 ${alarm.content}`}
                <span className='text-nowrap text-xs text-gray-400 pl-1'>{`${calculateData.time}${calculateData.result}전`}</span>
              </p>
            </div>
          </div>
        </div>
        <div className='relative md:right-5 md:top-7 lg:right-5 lg:top-7 md:absolute lg:absolute flex justify-end md:w-fit lg:w-fit'>
          <div className='flex items-center gap-2'>
            <div onClick={handleRead} className='cursor-pointer'>
              {readAlarm ? <CircleCheckBig size={20} /> : <Circle size={20} />}
            </div>
            <X size={20} onClick={isDelete} className='cursor-pointer' />
          </div>
        </div>
      </div>
    </Link>
  );
}
