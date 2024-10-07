import { getMyAlarmList } from '@/app/data/alarm';
import { getSessionUserData } from '@/app/data/user';
import AlarmCard from './_components/alarm-card';

export default async function Page() {
  const user = await getSessionUserData();
  const data = await getMyAlarmList(user!.id);
  return (
    <div className='flex flex-col h-[calc(100vh-80px-112px)]'>
      <h1 className='text-2xl font-bold py-5'>알림 목록</h1>
      <div className='flex flex-col items-center justify-center gap-10 relative'>
        {data.alarms.length === 0 ? (
          <div className='h-full'>
            <div
              className={`border rounded-lg flex items-center gap-2 py-3 px-5 shadow-lg hover:-translate-y-1 transition-transform 
            }`}
            >
              알림 없음
            </div>
          </div>
        ) : (
          <ul className='flex flex-col gap-2'>
            {data.alarms.map((item) => (
              <li key={item.id}>
                <AlarmCard
                  id={item.id}
                  content={item.content}
                  isRead={item.isRead}
                  createdAt={item.createdAt}
                  user={item.user}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
