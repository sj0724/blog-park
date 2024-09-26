import { auth } from '@/auth';
import Link from 'next/link';
import LogoutButton from './logout-button';

export default async function Nav() {
  const session = await auth();
  console.log(session);

  return (
    <section className='fixed top-0 right-0 flex justify-between px-4 py-2 w-screen'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>Blog Park</h1>
      </Link>
      <div className='flex text-xl font-bold gap-2'>
        {session ? (
          <LogoutButton />
        ) : (
          <>
            <Link href='/sign-in'>로그인</Link>
            <Link href='/sign-up'>회원가입</Link>
          </>
        )}
      </div>
    </section>
  );
}
