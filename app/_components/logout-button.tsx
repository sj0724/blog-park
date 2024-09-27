'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../action/user';

export default function LogoutButton() {
  const router = useRouter();
  const signOut = async () => {
    const result = await logout();
    if (result.success) router.refresh();
  };
  return (
    <div onClick={signOut} className='cursor-pointer'>
      로그아웃
    </div>
  );
}
