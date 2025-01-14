import { getMyFollow } from '@/app/data/follow';
import FollowingUserCard from './following-user-card';

export default async function FollowContainer() {
  const followList = await getMyFollow();

  return (
    <div className='max-w-[800px] w-full'>
      {!followList || followList.length === 0 ? (
        <ul className='flex flex-col items-center'>
          <div className='bg-white flex items-center justify-center gap-5 rounded-lg shadow-lg w-full h-40 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
            팔로우한 유저가 없습니다!
          </div>
        </ul>
      ) : (
        <ul className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3'>
          {followList.map((user) => (
            <li key={user.id}>
              <FollowingUserCard userId={user.followingId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
