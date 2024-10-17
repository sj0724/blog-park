import { getMyAlarmList } from '@/app/data/alarm';
import { getSessionUserData } from '@/app/data/user';
import AlarmCard from './_components/alarm-card';

export default async function Page() {
  const user = await getSessionUserData();
  const data = await getMyAlarmList(user!.id);
  return (
    <div className='flex flex-col min-h-[calc(100vh-80px-112px)] pb-5 px-5 w-full max-w-[600px]'>
      <h1 className='text-2xl font-bold py-5'>알림 목록</h1>
      <div className='flex flex-col items-center justify-center gap-10 relative'>
        {data.alarms.length === 0 ? (
          <div className='flex items-center justify-center gap-5 border rounded-lg shadow-lg w-full h-28 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
            알람이 없습니다!
          </div>
        ) : (
          <ul className='flex flex-col gap-3 w-full'>
            {data.alarms.map((item) => (
              <li key={item.id}>
                <AlarmCard
                  id={item.id}
                  content={item.content}
                  isRead={item.isRead}
                  createdAt={item.createdAt}
                  user={item.user}
                  link={item.routePath}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
