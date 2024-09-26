'use client';

import { logout } from '../action/user';

export default function LogoutButton() {
  const signOut = async () => {
    await logout();
  };
  return (
    <div onClick={signOut} className='cursor-pointer'>
      로그아웃
    </div>
  );
}
