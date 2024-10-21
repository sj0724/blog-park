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
  link: string | null;
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
  const isDelete = async (e: MouseEvent) => {
    e.preventDefault();
    const result = await deleteAlarm(id);
    toast.message(result.message);
    router.refresh();
  };

  return (
    <Link href={link ? link : '/'}>
      <div
        className={`relative rounded-lg flex flex-col py-3 px-5 shadow hover:shadow-lg hover:-translate-y-1 transition-transform w-full ${
          readAlarm ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <div className='flex gap-1'>
          <div className='flex items-center gap-2 text-sm'>
            <UserAvatar image={user.image} size='sm' />
            <div className='flex items-center'>
              <p className='text-wrap'>
                <span className='font-semibold'>{user.name}</span>
                {`님이 ${content}`}
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
