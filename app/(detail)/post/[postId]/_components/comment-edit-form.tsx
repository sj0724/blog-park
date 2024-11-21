import { editComment } from '@/app/action/comment';
import ServerActionButton from '@/components/server-action-button';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  content: string;
  toggleEdit: () => void;
  postId: string;
  commentId: string;
  isRefetch: () => void;
}

export default function CommentEditForm({
  content,
  toggleEdit,
  postId,
  commentId,
  isRefetch,
}: Props) {
  const formatContent = content.replace(/<br\s*\/?>/gi, '\n');
  const [newContent, setNewContent] = useState(formatContent);
  const mutation = useMutation({
    mutationFn: async () => {
      const formatNewContent = newContent.replace(/\n/g, '\n\n');
      return await editComment({
        commentId,
        content: formatNewContent,
        postId,
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message); // 성공 메시지 표시
        isRefetch();
        toggleEdit();
      } else {
        toast.error(result.message); // 에러 메시지 표시
      }
    },
    onError: () => {
      toast.error('댓글 수정에 실패했습니다.'); // 일반적인 에러 메시지 표시
    },
  });

  return (
    <div className='flex flex-col items-end gap-4'>
      <Textarea
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className='w-full h-28 text-lg'
        placeholder='댓글을 작성해주세요.'
      />
      <div className='flex gap-2'>
        <Button
          onClick={toggleEdit}
          type='button'
          className='bg-white text-black hover:bg-gray-200'
        >
          취소
        </Button>
        <ServerActionButton
          onClick={() => mutation.mutate()}
          type='button'
          isPending={mutation.isPending}
        >
          확인
        </ServerActionButton>
      </div>
    </div>
  );
}
