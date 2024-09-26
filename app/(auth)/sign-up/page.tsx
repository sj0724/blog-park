import { supabase } from '@/utils/supabase';
import RegisterForm from './_components/register-form';

export default async function Page() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    console.log('Users:', data);
  }
  return <RegisterForm />;
}
