import { getSessionUserData, getUserById } from '@/app/data/user';
import EditNameForm from './_components/edit-name-form';
import EditEmailorm from './_components/edit-email-form';

export default async function Page() {
  const session = await getSessionUserData();
  if (!session) return <div>인증이 필요합니다.</div>;
  const user = await getUserById(session.id);
  return (
    <div>
      <div>
        <EditNameForm name={session.name} />
        <EditEmailorm email={user.email ? user.email : ''} />
      </div>
    </div>
  );
}
