'use client';

import { Menu } from 'lucide-react';
import ListItem from './nav-menu-item';
import LogoutButton from './logout-button';
import { useEffect, useRef, useState } from 'react';

const userMenu: { title: string; href: string }[] = [
  { title: '포스트 작성하기', href: '/editor/create' },
  {
    title: '내 블로그',
    href: '/user',
  },
  {
    title: '내 정보 수정',
    href: '/user/edit',
  },
];

const nonMemberMenu: { title: string; href: string }[] = [
  {
    title: '로그인',
    href: '/sign-in',
  },
  {
    title: '가입하기',
    href: '/sign-up',
  },
];

export default function NavMenu({ userId }: { userId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={menuRef}
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer'
      >
        <Menu size={30} />
        {isOpen && (
          <div className='absolute flex justify-center top-20 right-0 left-0 h-fit bg-slate-200/80 backdrop-blur rounded-b-lg z-40'>
            {userId ? (
              <ul className='flex flex-col w-full max-w-[300px] gap-3 p-4'>
                {userMenu.map((menu) => (
                  <li key={menu.title}>
                    <ListItem
                      title={menu.title}
                      href={
                        menu.href === '/user' ? `/user/${userId}` : menu.href
                      }
                    />
                  </li>
                ))}
                <LogoutButton />
              </ul>
            ) : (
              <ul className='flex flex-col w-full max-w-[300px] gap-3 p-4'>
                {nonMemberMenu.map((menu) => (
                  <li key={menu.title}>
                    <ListItem title={menu.title} href={menu.href} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
