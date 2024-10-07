'use client';

import { deleteAlarm, toggleAlarm } from '@/app/action/alarm';
import { UserAvatar } from '@/components/user-avatar';
import { SupabaseUser } from '@/type';
import calculateDate from '@/utils/calculateData';
import { Circle, CircleCheckBig, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const calculateData = calculateDate(createdAt ? createdAt : '');
  const handleRead = async () => {
    setReadAlarm(!readAlarm);
    const result = await toggleAlarm(id);
    toast.message(result.message);
  };
  const isDelete = async () => {
    const result = await deleteAlarm(id);
    toast.message(result.message);
    router.refresh();
  };

  return (
    <div
      className={`border rounded-lg flex items-center gap-2 py-3 px-5 shadow-lg hover:-translate-y-1 transition-transform ${
        readAlarm && 'bg-gray-200'
      }`}
    >
      <div className='flex items-center gap-2'>
        <UserAvatar image={user.image} size='sm' />
        <Link href={`/user/${user.id}`}>
          <div className='flex items-center'>
            <p className='text-lg font-semibold hover:underline'>{user.name}</p>
            <p>님께서</p>
          </div>
        </Link>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <p>{`${calculateData.time}${calculateData.result}전`}</p>
      <div className='flex items-center gap-2'>
        <div onClick={handleRead} className='cursor-pointer'>
          {readAlarm ? <CircleCheckBig size={20} /> : <Circle size={20} />}
        </div>
        <X size={20} onClick={isDelete} className='cursor-pointer' />
      </div>
    </div>
  );
}
