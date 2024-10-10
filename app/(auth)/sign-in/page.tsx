import Link from 'next/link';
import LoginForm from './_components/login-form';
import OAuthForm from './_components/oauth-form';

export default async function Page() {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-52px)]'>
      <div className='flex flex-col gap-3 max-w-96 w-full px-5'>
        <LoginForm />
        <OAuthForm />
        <div className='flex justify-center gap-1 items-center'>
          <p>회원이 아니라면</p>
          <Link href='/sign-up'>
            <p className='text-lg w-fit h-fit font-bold'>가입하기!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
