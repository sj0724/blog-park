import { getSessionUserData, getUserById } from '@/app/data/user';
import { UserAvatar } from '@/components/user-avatar';
import FollowButtonContainer from './follow-button-container';
import { getFollowStatus } from '@/app/data/follow';
import GithubRepoModal from './github-repo-modal';
import { getAllRepo } from '@/app/data/log';

export default async function Profile({ userId }: { userId: string }) {
  const session = await getSessionUserData();
  const userData = await getUserById(userId);
  const followStatus = await getFollowStatus(userId);
  const repoList: string[] = await getAllRepo();

  return (
    <div className='flex flex-col items-center gap-5 py-5'>
      <UserAvatar image={userData.image} size='lg' />
      <div className='flex flex-col items-center gap-1'>
        <p className='text-3xl font-semibold'>{userData.name}</p>
        <p className='text-gray-600 text-sm'>{userData.email}</p>
        <p className='text-gray-600'>
          {userData.introduction
            ? userData.introduction
            : '아직 소개를 작성하지 않았습니다.'}
        </p>
        {session?.id !== userId && (
          <FollowButtonContainer userId={userId} followStatus={followStatus} />
        )}
        {session?.id === userId && session.OAuth === 'github' && (
          <GithubRepoModal list={repoList} />
        )}
      </div>
    </div>
  );
}
