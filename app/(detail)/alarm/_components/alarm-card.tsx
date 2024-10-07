'use client';

import { deleteAlarm, toggleAlarm } from '@/app/action/alarm';
import { UserAvatar } from '@/components/user-avatar';
import { SupabaseUser } from '@/type';
import calculateDate from '@/utils/calculateData';
import { Circle, CircleCheckBig, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string | null;
  user: SupabaseUser;
  link: string;
}

export default function AlarmCard({
  id,
  content,
  isRead,
  createdAt,
  user,
  link,
}: Props) {
  const [readAlarm, setReadAlarm] = useState(isRead);
  const router = useRouter();
  const calculateData = calculateDate(createdAt ? createdAt : '');
  const handleRead = async (e: MouseEvent) => {
    e.preventDefault();
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
    <Link href={link}>
      <div
        className={`border rounded-lg flex items-center gap-1 py-3 px-5 shadow-lg hover:-translate-y-1 transition-transform w-[600px] ${
          readAlarm && 'bg-gray-200'
        }`}
      >
        <div className='flex items-center gap-2 text-sm'>
          <UserAvatar image={user.image} size='sm' />
          <div className='flex items-center'>
            <p className='font-semibold text-nowrap'>{user.name}</p>
            <p className='text-nowrap'>님이</p>
          </div>
        </div>
        <div className='flex items-center gap-1 w-full text-sm'>
          <p>{content}</p>
          <p className='text-nowrap text-xs text-gray-400'>{`${calculateData.time}${calculateData.result}전`}</p>
        </div>
        <div className='flex items-center gap-2'>
          <div onClick={handleRead} className='cursor-pointer'>
            {readAlarm ? <CircleCheckBig size={20} /> : <Circle size={20} />}
          </div>
          <X size={20} onClick={isDelete} className='cursor-pointer' />
        </div>
      </div>
    </Link>
  );
}
