'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../action/user';

export default function LogoutButton() {
  const router = useRouter();
  const signOut = async () => {
    const result = await logout();
    if (result.success) {
      router.refresh();
      router.replace('/');
    }
  };

  return (
    <div
      onClick={signOut}
      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer'
    >
      <div className='font-medium leading-none text-nowrap text-center text-base'>
        로그아웃
      </div>
    </div>
  );
}
