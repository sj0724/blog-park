import { getSessionUserData } from '@/app/data/user';
import { formatDateRange } from '@/utils/formatData';
import { DotFilledIcon } from '@radix-ui/react-icons';
import PostButtonContainer from './post-button-container';
import Link from 'next/link';
import { Post } from '@/type';
import LikeButton from './like-button';
import MarkdownEditor from '@/components/markdown-editor';
import TagBadge from '@/components/tag-badge';

interface Props {
  totalLike: number;
  personalStatus: boolean;
  post: Post;
}

export default async function PostContents({
  totalLike,
  personalStatus,
  post,
}: Props) {
  const currentUser = await getSessionUserData();
  const formatData = formatDateRange({ dateString: post.createdAt });
  return (
    <div className='max-w-[800px] flex flex-col gap-12 w-full'>
      <div className='flex flex-col gap-2'>
        <p className='text-4xl md:text-6xl lg:text-6xl font-extrabold'>
          {post.title}
        </p>
        <div className='flex justify-end'>
          {currentUser?.id === post.posts_user_id_fkey.id && (
            <PostButtonContainer postId={post.id} />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center text-center'>
            <Link href={`/user/${post.posts_user_id_fkey.id}`}>
              <p className='font-semibold text-lg'>
                {post.posts_user_id_fkey.name}
              </p>
            </Link>
            <DotFilledIcon width={10} height={10} />
            <p className='text-gray-600'>{formatData}</p>
            <div className='flex gap-2 items-center lg:hidden'>
              <DotFilledIcon width={10} height={10} />
              <div className='flex gap-2 items-center'>
                <LikeButton
                  postId={post.id}
                  personalStatus={personalStatus}
                  createrId={post.user_id}
                  size={20}
                />
                <p>{totalLike}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            {post.tag &&
              post.tag.map((item) => (
                <TagBadge key={item} tag={item} type='badge' />
              ))}
          </div>
        </div>
      </div>
      <MarkdownEditor markdownText={post.content} />
    </div>
  );
}
