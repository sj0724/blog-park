'use client';

import { deleteComment } from '@/app/action/comment';
import DeleteButton from './post-delete-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CommentButtonContainer({
  commentId,
}: {
  commentId: string;
}) {
  const router = useRouter();
  const isDeleteCommnet = async () => {
    const result = await deleteComment(commentId);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };
  return (
    <div className='flex gap-2'>
      <p>수정</p>
      <DeleteButton isDelete={isDeleteCommnet} />
    </div>
  );
}
