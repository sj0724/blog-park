import { getMyFollow } from '@/app/data/follow';
import FollowingUserCard from './following-user-card';

export default async function FollowContainer() {
  const followList = await getMyFollow();

  return (
    <ul className='flex flex-col items-center'>
      {!followList || followList.length === 0 ? (
        <div className='flex items-center justify-center gap-5 border rounded-lg shadow-lg w-[550px] h-52 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
          팔로우한 유저가 없습니다!
        </div>
      ) : (
        followList.map((user) => (
          <li key={user.id}>
            <FollowingUserCard userId={user.followingId} />
          </li>
        ))
      )}
    </ul>
  );
}
