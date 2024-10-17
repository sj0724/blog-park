'use client';

import { deleteComment } from '@/app/action/comment';
import DeleteButton from './post-delete-button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  commentId: string;
  toggleEdit: () => void;
  isEdit: boolean;
  postId: string;
}

export default function CommentButtonContainer({
  commentId,
  toggleEdit,
  isEdit,
  postId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await deleteComment(commentId);
      return result;
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message); // 성공 메시지 표시
        queryClient.invalidateQueries({ queryKey: [`${postId}:comment`] }); // 댓글 목록 갱신
        router.refresh();
      } else {
        toast.error(result.message); // 에러 메시지 표시
      }
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.'); // 일반적인 에러 메시지 표시
    },
  });

  return (
    <div className='flex gap-2'>
      {!isEdit && (
        <>
          <div onClick={toggleEdit} className='text-gray-400 cursor-pointer'>
            수정
          </div>
          <DeleteButton
            isDelete={mutation.mutate}
            open={isOpen}
            setModalOpen={setIsOpen}
          />
        </>
      )}
    </div>
  );
}
