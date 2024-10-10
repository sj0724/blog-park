// import { supabase } from '@/utils/supabase';
import RegisterForm from './_components/register-form';

export default async function Page() {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-52px)]'>
      <div className='max-w-96 w-full px-5'>
        <RegisterForm />
      </div>
    </div>
  );
}
