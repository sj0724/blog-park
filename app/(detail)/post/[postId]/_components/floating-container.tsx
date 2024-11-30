import { Post } from '@/type';
import LikeButton from './like-button';
import ShareLinkButton from './share-link-button';

interface Props {
  post: Post;
  personalStatus: boolean;
  createrId: string;
  totalLike: number;
}

export default function FloatingContainer({
  personalStatus,
  createrId,
  totalLike,
  post,
}: Props) {
  return (
    <div className='hidden fixed top-40 left-1/2 -translate-x-[500px] h-fit border shadow-md p-1 rounded-full lg:flex flex-col gap-3 bg-white'>
      <div className='flex flex-col items-center gap-2'>
        <div className='shadow-md border rounded-full p-2 hover:-translate-y-1 transition-transform'>
          <LikeButton
            postId={post.id}
            personalStatus={personalStatus}
            createrId={createrId}
            size={30}
          />
        </div>
        <p className='font-semibold'>{totalLike}</p>
      </div>
      <ShareLinkButton post={post} type='float' />
    </div>
  );
}
