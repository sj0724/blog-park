import { UserAvatar } from '@/components/user-avatar';
import { Comment } from '@/type';

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className='px-4 py-2 min-h-20 flex flex-col justify-center gap-3'>
      <div className='flex items-center gap-2 py-3'>
        <UserAvatar image={comment.user.image} />
        <p className='font-semibold'>{comment.user.name}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
    </div>
  );
}
