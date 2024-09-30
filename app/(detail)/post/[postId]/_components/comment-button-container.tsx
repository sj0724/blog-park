'use client';

import { deleteComment } from '@/app/action/comment';
import DeleteButton from './post-delete-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  commentId: string;
  toggleEdit: () => void;
  isEdit: boolean;
}

export default function CommentButtonContainer({
  commentId,
  toggleEdit,
  isEdit,
}: Props) {
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
      {!isEdit && (
        <>
          <Button onClick={toggleEdit} type='button'>
            수정
          </Button>
          <DeleteButton isDelete={isDeleteCommnet} />
        </>
      )}
    </div>
  );
}
