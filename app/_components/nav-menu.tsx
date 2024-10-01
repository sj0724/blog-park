'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import ListItem from './nav-menu-item';
import LogoutButton from './logout-button';

const userMenu: { title: string; href: string }[] = [
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
  return (
    <NavigationMenu>
      <NavigationMenuList className='flex gap-2'>
        <NavigationMenuItem>
          <Link href='/post/create'>
            <p className='text-lg'>작성하기</p>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-lg font-bold'>
            내 메뉴
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {userId ? (
              <ul className='flex flex-col w-fit gap-3 p-4'>
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
              <ul className='flex flex-col w-fit gap-3 p-4'>
                {nonMemberMenu.map((menu) => (
                  <li key={menu.title}>
                    <ListItem title={menu.title} href={menu.href} />
                  </li>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
