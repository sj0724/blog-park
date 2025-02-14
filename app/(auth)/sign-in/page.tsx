import Link from 'next/link';
import LoginForm from './_components/login-form';
import OAuthForm from './_components/oauth-form';
import { Separator } from '@/components/ui/separator';

export default async function Page() {
  return (
    <div className='flex flex-col justify-center items-center max-h-[calc(100vh-52px)] w-full'>
      <div className='flex flex-col gap-3 w-full px-5 max-w-96'>
        <LoginForm />
        <div className='flex items-center justify-center gap-3 w-full'>
          <Separator className='w-2/5' />
          <p className='text-gray-500'>or</p>
          <Separator className='w-2/5' />
        </div>
        <OAuthForm />
        <div className='flex justify-center gap-1 items-center text-gray-500'>
          <p className='text-base'>회원이 아니라면</p>
          <Link href='/sign-up'>
            <p className='text-base w-fit h-fit font-bold'>가입하기!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
