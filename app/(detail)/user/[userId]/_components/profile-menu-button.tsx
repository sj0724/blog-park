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
        className={`flex items-center gap-3 px-7 py-4 w-48 justify-center ${
          id === currentMenu && 'bg-gray-100 rounded-lg'
        }`}
      >
        {children}
        <p className='text-xl text-nowrap font-bold'>{text}</p>
      </div>
    </Link>
  );
}
