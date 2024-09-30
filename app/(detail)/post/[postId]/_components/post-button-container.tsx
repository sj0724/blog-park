'use client';

import Link from 'next/link';
import { deletePost } from '@/app/action/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DeleteButton from './post-delete-button';

export default function PostButtonContainer({ postId }: { postId: string }) {
  const router = useRouter();
  const isDeletePost = async () => {
    const result = await deletePost(postId);
    if (result.success) {
      toast.message(result.message);
      router.replace('/post/list');
    }
  };

  return (
    <div className='flex gap-2'>
      <Link href={`/post/edit/${postId}`}>수정</Link>
      <DeleteButton isDelete={isDeletePost} />
    </div>
  );
}
