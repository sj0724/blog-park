import { getSessionUserData, getUserById } from '@/app/data/user';
import EditNameForm from './_components/edit-name-form';
import EditEmailorm from './_components/edit-email-form';
import EditIntroductionForm from './_components/edit-introduce-form';
import EditPasswordForm from './_components/edit-password-form';
import EditImageForm from './_components/edit-image-form';

export default async function Page() {
  const session = await getSessionUserData();
  if (!session) return <div>인증이 필요합니다.</div>;
  const user = await getUserById(session.id);
  return (
    <div className='flex flex-col justify-center gap-4 w-full max-w-[400px] h-[calc(100vh-80px)] px-5'>
      <h1 className='text-2xl font-bold'>내 정보 수정</h1>
      <div className='flex flex-col'>
        <EditImageForm image={user.image ? user.image : ''} />
        <EditNameForm name={user.name ? user.name : ''} />
        <EditEmailorm email={user.email ? user.email : ''} />
        <EditIntroductionForm
          introduction={user.introduction ? user.introduction : ''}
        />
        <EditPasswordForm Oauth={user.oauth_account} />
      </div>
    </div>
  );
}
