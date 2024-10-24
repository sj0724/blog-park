import { getSessionUserData, getUserById } from '@/app/data/user';
import EditNameForm from './_components/edit-name-form';
import EditIntroductionForm from './_components/edit-introduce-form';
import EditPasswordForm from './_components/edit-password-form';
import EditImageForm from './_components/edit-image-form';

export default async function Page() {
  const session = await getSessionUserData();
  if (!session) return <div>인증이 필요합니다.</div>;
  const user = await getUserById(session.id);
  return (
    <div className='flex items-center w-full max-w-[600px] min-h-[calc(100vh-80px-112px)] py-10'>
      <div className='flex flex-col gap-4 justify-center w-full bg-white px-5 py-7 shadow rounded-lg'>
        <h1 className='text-2xl font-bold'>내 정보 수정</h1>
        <div className='flex flex-col gap-8'>
          <EditImageForm image={user.image ? user.image : ''} />
          <div className='flex flex-col'>
            <EditNameForm name={user.name ? user.name : ''} />
            <EditIntroductionForm
              introduction={user.introduction ? user.introduction : ''}
            />
            <EditPasswordForm
              Oauth={user.oauth_account ? user.oauth_account : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
