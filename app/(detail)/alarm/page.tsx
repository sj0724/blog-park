import { getMyAlarmList } from '@/app/data/alarm';
import { getSessionUserData } from '@/app/data/user';
import AlarmCard from './_components/alarm-card';

export default async function Page() {
  const user = await getSessionUserData();
  if (!user) return <div>유저 없음</div>;
  const data = await getMyAlarmList(user.id);
  return (
    <div className='flex flex-col items-center justify-center px-4 py-20 gap-10 relative'>
      <ul>
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
    </div>
  );
}
