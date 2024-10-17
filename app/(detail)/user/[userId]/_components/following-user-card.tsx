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
      <div className='bg-white flex items-center gap-5 rounded-lg shadow hover:shadow-lg w-full px-8 py-4 hover:-translate-y-1 transition-transform'>
        <UserAvatar image={userData.image} size='md' />
        <div className='w-full'>
          <p className='font-bold text-3xl text-center'>{userData.name}</p>
        </div>
      </div>
    </Link>
  );
}
