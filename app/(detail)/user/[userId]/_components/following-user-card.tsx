import { getUserById } from '@/app/data/user';
import { UserAvatar } from '@/components/user-avatar';
import Link from 'next/link';

export default async function FollowingUserCard({
  userId,
}: {
  userId: string;
}) {
  const userData = await getUserById(userId);
  return (
    <Link href={`/user/${userId}`}>
      <div className='flex items-center gap-5 border rounded-lg shadow-lg w-[550px] px-8 py-4 hover:-translate-y-1 transition-transform'>
        <UserAvatar image={userData.image} size='lg' />
        <div className='w-60'>
          <p className='font-bold text-3xl'>{userData.name}</p>
          <p className='text-gray-500'>{userData.introduction}</p>
        </div>
      </div>
    </Link>
  );
}
