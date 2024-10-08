import { getSessionUserData } from '@/app/data/user';
import formatDateRange from '@/utils/formatData';
import { DotFilledIcon } from '@radix-ui/react-icons';
import PostButtonContainer from './post-button-container';
import Link from 'next/link';
import { SupabaseUser } from '@/type';
import MarkdownComponent from '@/components/Markdown';
import LikeButton from './\blike-button';

interface Props {
  title: string;
  contents: string;
  user: SupabaseUser;
  createdAt: string;
  postId: string;
  totalLike: number;
  createrId: string;
  personalStatus: boolean;
}

export default async function PostContents({
  contents,
  title,
  user,
  createdAt,
  postId,
  totalLike,
  createrId,
  personalStatus,
}: Props) {
  const currentUser = await getSessionUserData();
  const formatData = formatDateRange({ dateString: createdAt });
  return (
    <div className='lg:w-[800px] max-w-[800px] flex flex-col gap-12'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-6xl font-extrabold'>{title}</h1>
        <div className='flex justify-end'>
          {currentUser?.id === user.id && (
            <PostButtonContainer postId={postId} />
          )}
        </div>
        <div className='flex'>
          <div className='flex gap-2 items-center text-center'>
            <Link href={`/user/${user.id}`}>
              <p className='font-semibold text-lg'>{user.name}</p>
            </Link>
            <DotFilledIcon width={10} height={10} />
            <p className='text-gray-600'>{formatData}</p>
            <div className='flex gap-2 items-center lg:hidden'>
              <DotFilledIcon width={10} height={10} />
              <div className='flex gap-2 items-center'>
                <LikeButton
                  postId={postId}
                  personalStatus={personalStatus}
                  createrId={createrId}
                  size={20}
                />
                <p>{totalLike}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarkdownComponent markdownText={contents} />
    </div>
  );
}
