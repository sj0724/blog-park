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
      className='block p-3 leading-none no-underline outline-none hover:border-b-4 hover:border-b-blue-500 h-12 cursor-pointer'
    >
      <div className='font-semibold leading-none text-nowrap text-center text-lg'>
        로그아웃
      </div>
    </div>
  );
}
