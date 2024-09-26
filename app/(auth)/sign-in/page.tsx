import LoginForm from './_components/login-form';

export default async function Page() {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-52px)]'>
      <div className='w-96'>
        <LoginForm />
      </div>
    </div>
  );
}
