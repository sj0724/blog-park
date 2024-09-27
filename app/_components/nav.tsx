import { auth } from '@/auth';
import Link from 'next/link';
import LogoutButton from './logout-button';
import LinkCreatePost from './link-create-post';

export default async function Nav() {
  const session = await auth();

  return (
    <section className='fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 h-20 bg-white/50 backdrop-blur-xl shadow-md z-40'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>Blog Park</h1>
      </Link>
      <div className='flex text-xl font-bold gap-2'>
        {session ? (
          <>
            <LinkCreatePost />
            <LogoutButton />
          </>
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
