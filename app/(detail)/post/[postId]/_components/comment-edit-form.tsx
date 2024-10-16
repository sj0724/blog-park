import { editComment } from '@/app/action/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  content: string;
  toggleEdit: () => void;
  postId: string;
  commentId: string;
  page: number;
}

export default function CommentEditForm({
  content,
  toggleEdit,
  postId,
  commentId,
  page,
}: Props) {
  const formatContent = content.replace(/<br\s*\/?>/gi, '\n');
  const [newContent, setNewContent] = useState(formatContent);
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({
          queryKey: [`${postId}:comment`, page],
        }); // 댓글 목록 갱신
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
          className='bg-red-500 hover:bg-red-400'
        >
          취소
        </Button>
        <Button onClick={() => mutation.mutate()} type='button'>
          확인
        </Button>
      </div>
    </div>
  );
}
