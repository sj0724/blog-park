'use client';

import { deleteComment } from '@/app/action/comment';
import DeleteButton from './post-delete-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDeleteCommnet = async () => {
    const result = await deleteComment(commentId);
    setIsOpen(!isOpen);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };

  return (
    <div className='flex gap-2'>
      {!isEdit && (
        <>
          <div onClick={toggleEdit} className='text-gray-400 cursor-pointer'>
            수정
          </div>
          <DeleteButton
            isDelete={isDeleteCommnet}
            open={isOpen}
            setModalOpen={setIsOpen}
          />
        </>
      )}
    </div>
  );
}
