import { UserAvatar } from '@/components/user-avatar';
import { Comment } from '@/type';
import CommentButtonContainer from './comment-button-container';
import { getSessionUserData } from '@/app/data/user';

export default async function CommentCard({ comment }: { comment: Comment }) {
  const session = await getSessionUserData();
  return (
    <div className='px-4 py-2 min-h-20 flex flex-col justify-center gap-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 py-3'>
          <UserAvatar image={comment.user.image} size='sm' />
          <p className='font-semibold'>{comment.user.name}</p>
        </div>
        {session?.id === comment.user_id && (
          <CommentButtonContainer commentId={comment.id} />
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
    </div>
  );
}
