import { getCommentList } from '@/app/data/commnet';
import CommentForm from './comment-form';
import CommentCard from './comment-card';
import { Separator } from '@/components/ui/separator';

export default async function CommentContainer({ postId }: { postId: string }) {
  const commentList = await getCommentList({ page: 1, limit: 5, postId });

  return (
    <div className='w-full max-w-[800px] gap-2 flex flex-col'>
      <p className='text-xl'>{commentList.totalCount}개의 댓글</p>
      <CommentForm postId={postId} />
      <ul className='flex flex-col gap-3'>
        {commentList.comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} />
            <Separator className='mt-3' />
          </li>
        ))}
      </ul>
    </div>
  );
}
