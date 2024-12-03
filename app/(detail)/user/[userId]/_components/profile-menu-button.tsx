'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
  currentMenu: string;
  userId: string;
}

export default function ProfileMenuButton({
  children,
  id,
  currentMenu,
  userId,
}: Props) {
  const router = useRouter();

  const changeMenu = () => {
    const url = `/user/${userId}?menu=${id}`;
    router.push(url.toString());
  };

  return (
    <div>
      <div
        className={`flex items-center gap-3 px-7 py-4 lg:w-48 w-24 justify-center hover:bg-slate-200 cursor-pointer transition-colors duration-300 rounded-lg`}
        onClick={changeMenu}
      >
        {children}
      </div>
      {id === currentMenu && <div className='w-full h-1 bg-blue-500' />}
    </div>
  );
}
