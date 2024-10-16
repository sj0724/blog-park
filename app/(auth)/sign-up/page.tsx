// import { supabase } from '@/utils/supabase';
import { Separator } from '@/components/ui/separator';
import RegisterForm from './_components/register-form';
import OAuthForm from '../sign-in/_components/oauth-form';

export default async function Page() {
  return (
    <div className='flex flex-col items-center h-[calc(100vh-52px)]'>
      <div className='flex flex-col gap-3 max-w-96 w-full px-5 py-10'>
        <RegisterForm />
        <div className='flex items-center justify-center gap-3 w-full'>
          <Separator className='w-2/5' />
          <p className='text-gray-500'>or</p>
          <Separator className='w-2/5' />
        </div>
        <OAuthForm />
        <p className='text-base text-center font-semibold'>
          다른 플랫폼으로 가입해보세요!
        </p>
      </div>
    </div>
  );
}
