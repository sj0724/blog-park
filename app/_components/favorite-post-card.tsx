import Link from 'next/link';
import { getUserById } from '../data/user';

interface Props {
  title: string;
  userId: string;
  id: string;
}

export default async function FavoritePostCard({ title, userId, id }: Props) {
  const user = await getUserById(userId);

  return (
    <Link href={`/post/${id}`}>
      <div className='flex flex-col w-[300px] h-24 justify-center gap-2 py-2 px-1 hover:text-blue-500'>
        <p className='font-semibold'>{title}</p>
        <div className='flex'>
          <p className='text-sm text-gray-600'>{user.name}</p>
        </div>
      </div>
    </Link>
  );
}
