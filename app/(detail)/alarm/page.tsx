import { getMyAlarmList } from '@/app/data/alarm';
import { getSessionUserData } from '@/app/data/user';
import AlarmContainer from './_components/alarm-container';

export default async function Page() {
  const user = await getSessionUserData();
  const data = await getMyAlarmList({ userId: user!.id });
  return (
    <div className='flex flex-col min-h-[calc(100vh-80px-112px)] pb-5 px-5 w-full max-w-[600px]'>
      <h1 className='text-xl font-bold py-5'>알림 목록</h1>
      <AlarmContainer
        list={data.alarms}
        userId={user!.id}
        totalCount={data.total ? data.total : 0}
      />
    </div>
  );
}
