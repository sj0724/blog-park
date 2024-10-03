import { getSessionUserData } from '@/app/data/user';
import formatDateRange from '@/utils/formatData';
import { DotFilledIcon } from '@radix-ui/react-icons';
import PostButtonContainer from './post-button-container';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { SupabaseUser } from '@/type';

interface Props {
  title: string;
  contents: string;
  user: SupabaseUser;
  createdAt: string;
  postId: string;
  totalLike: number;
}

export default async function PostContents({
  contents,
  title,
  user,
  createdAt,
  postId,
  totalLike,
}: Props) {
  const currentUser = await getSessionUserData();
  const formatData = formatDateRange({ dateString: createdAt });
  return (
    <div className='w-[800px] flex flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-6xl font-extrabold'>{title}</h1>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center text-center h-10'>
            <Link href={`/user/${user.id}`}>
              <p className='font-semibold text-lg'>{user.name}</p>
            </Link>
            <DotFilledIcon width={10} height={10} />
            <p className='text-gray-600'>{formatData}</p>
            <DotFilledIcon width={10} height={10} />
            <div className='flex gap-2'>
              <Heart size={20} />
              <p>{totalLike}</p>
            </div>
          </div>
          {currentUser?.id === user.id && (
            <PostButtonContainer postId={postId} />
          )}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: contents }} className='prose' />
    </div>
  );
}
