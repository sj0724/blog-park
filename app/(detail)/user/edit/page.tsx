import { getSessionUserData } from '@/app/data/user';
import EditNameForm from './_components/edit-name-form';

export default async function Page() {
  const session = await getSessionUserData();
  if (!session) return <div>인증이 필요합니다.</div>;
  return (
    <div>
      <div>
        <EditNameForm name={session.name} />
      </div>
    </div>
  );
}
