import { getSessionUserData, getUserById } from '@/app/data/user';
import { UserAvatar } from '@/components/user-avatar';
import FollowButtonContainer from './follow-button-container';
import { getFollowStatus } from '@/app/data/follow';

export default async function Profile({ userId }: { userId: string }) {
  const session = await getSessionUserData();
  const userData = await getUserById(userId);
  const followStatus = await getFollowStatus(userId);
  return (
    <div className='flex items-center gap-8 py-8'>
      <UserAvatar image={userData.image} size='lg' />
      <div className='flex flex-col gap-2'>
        <p className='text-3xl font-semibold'>{userData.name}</p>
        <p className='text-gray-600 text-lg'>
          {userData.introduction
            ? userData.introduction
            : '아직 소개를 작성하지 않았습니다.'}
        </p>
        {session?.id !== userId && (
          <FollowButtonContainer userId={userId} followStatus={followStatus} />
        )}
      </div>
    </div>
  );
}
