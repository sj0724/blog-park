'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function ProfileMenuButton({
  children,
  id,
  currentMenu,
}: {
  children: ReactNode;
  id: string;
  currentMenu: string;
}) {
  const router = useRouter();

  const changeMenu = () => {
    const url = new URL(window.location.href);
    const isUrl = url.searchParams.get('menu');
    if (isUrl) {
      url.searchParams.set('menu', id);
    } else {
      url.searchParams.append('menu', id);
    }
    router.push(url.toString());
  };

  return (
    <div>
      <div
        className={`flex items-center gap-3 px-7 py-4 lg:w-48 w-24 justify-center hover:bg-slate-200 transition-colors duration-300 rounded-lg`}
        onClick={changeMenu}
      >
        {children}
      </div>
      {id === currentMenu && <div className='w-full h-1 bg-blue-500' />}
    </div>
  );
}
