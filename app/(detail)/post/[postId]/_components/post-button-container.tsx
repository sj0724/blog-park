import Link from 'next/link';
import PostDeleteButton from './post-delete-button';

export default function PostButtonContainer({ postId }: { postId: string }) {
  return (
    <div className='flex gap-2'>
      <Link href={`/post/edit/${postId}`}>수정</Link>
      <PostDeleteButton postId={postId} />
    </div>
  );
}
