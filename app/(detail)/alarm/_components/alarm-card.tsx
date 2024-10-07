'use client';

import { toggleAlarm } from '@/app/action/alarm';
import { UserAvatar } from '@/components/user-avatar';
import { SupabaseUser } from '@/type';
import calculateDate from '@/utils/calculateData';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string | null;
  user: SupabaseUser;
}

export default function AlarmCard({
  id,
  content,
  isRead,
  createdAt,
  user,
}: Props) {
  const [readAlarm, setReadAlarm] = useState(isRead);
  const handleRead = async () => {
    const result = await toggleAlarm(id);
    setReadAlarm(!readAlarm);
    toast.message(result.message);
  };
  const calculateData = calculateDate(createdAt ? createdAt : '');

  return (
    <div
      className={`border rounded-lg flex items-center gap-2 py-3 px-5 hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer ${
        readAlarm && 'bg-gray-200'
      }`}
      onClick={handleRead}
    >
      <div className='flex items-center gap-2'>
        <UserAvatar image={user.image} size='sm' />
        <p>{`${user.name} 님이`}</p>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <p>{`${calculateData.time}${calculateData.result}전`}</p>
    </div>
  );
}
