import { getUserById } from '@/app/data/user';
import { UserAvatar } from '@/components/user-avatar';

export default async function Profile({ userId }: { userId: string }) {
  const userData = await getUserById(userId);
  return (
    <div className='flex items-center gap-8 pt-8'>
      <UserAvatar image={userData.image} size='lg' />
      <div className='flex flex-col gap-2'>
        <p className='text-3xl font-semibold'>{userData.name}</p>
        <p className='text-gray-600 text-lg'>
          {userData.introduction
            ? userData.introduction
            : '아직 소개를 작성하지 않았습니다.'}
        </p>
      </div>
    </div>
  );
}
