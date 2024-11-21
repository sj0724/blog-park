'use client';

import { createComment } from '@/app/action/comment';
import ServerActionButton from '@/components/server-action-button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  postId: string;
  createrId: string;
  isRefetch: () => void;
}

export default function CommentForm({ postId, createrId, isRefetch }: Props) {
  const [content, setContent] = useState('');
  const mutation = useMutation({
    mutationFn: async () => {
      const formatContent = content.replace(/\n/g, '\n\n');
      return await createComment({
        postId,
        content: formatContent,
        createrId,
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        setContent(''); // 입력 필드 비우기
        toast.success(result.message); // 성공 메시지 표시
        isRefetch();
      } else {
        toast.error(result.message); // 에러 메시지 표시
      }
    },
    onError: () => {
      toast.error('댓글 제출에 실패했습니다.'); // 일반적인 에러 메시지 표시
    },
  });

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleForm} className='flex flex-col items-end gap-4'>
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        className='w-full h-28 text-lg'
        placeholder='댓글을 작성해주세요.'
        value={content}
      />
      <ServerActionButton
        type='submit'
        className='w-20 h-10'
        isPending={mutation.isPending}
      >
        등록
      </ServerActionButton>
    </form>
  );
}
