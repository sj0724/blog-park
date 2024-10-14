'use client';

import { deleteComment } from '@/app/action/comment';
import DeleteButton from './post-delete-button';
import { toast } from 'sonner';
import { useState } from 'react';

interface Props {
  commentId: string;
  toggleEdit: () => void;
  isEdit: boolean;
  deleteList: (commentId: string) => void;
}

export default function CommentButtonContainer({
  commentId,
  toggleEdit,
  isEdit,
  deleteList,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isDeleteCommnet = async () => {
    const result = await deleteComment(commentId);
    setIsOpen(!isOpen);
    if (result.success) {
      toast.message(result.message);
      deleteList(commentId);
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
