'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

export default function ProfileMenuButton({
  children,
  text,
  href,
  id,
  currentMenu,
}: {
  children: ReactNode;
  text: string;
  href: string;
  id: string;
  currentMenu: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-7 py-4 lg:w-48 w-24 justify-center hover:bg-slate-200 transition-colors duration-300 rounded-lg`}
      >
        {children}
        <p className='text-xl text-nowrap font-bold hidden lg:block'>{text}</p>
      </div>
      {id === currentMenu && <div className='w-full h-1 bg-blue-500' />}
    </Link>
  );
}
