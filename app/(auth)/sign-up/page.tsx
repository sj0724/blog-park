// import { supabase } from '@/utils/supabase';
import RegisterForm from './_components/register-form';

export default async function Page() {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-52px)]'>
      <div className='w-96'>
        <RegisterForm />
      </div>
    </div>
  );
}
