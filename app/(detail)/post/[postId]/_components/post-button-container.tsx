import Link from 'next/link';
import PostDeleteButton from './post-delete-button';

export default function PostButtonContainer() {
  return (
    <div className='flex gap-2'>
      <Link href='/post/edit'>수정</Link>
      <PostDeleteButton />
    </div>
  );
}
