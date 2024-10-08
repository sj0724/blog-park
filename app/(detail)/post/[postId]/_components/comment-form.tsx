'use client';

import { createComment } from '@/app/action/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/type';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function CommentForm({
  postId,
  createrId,
  updateList,
}: {
  postId: string;
  createrId: string;
  updateList: (comment: Comment) => void;
}) {
  const [content, setContent] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formatContent = content.replace(/\n/g, '\n\n');
    const result = await createComment({
      postId,
      content: formatContent,
      createrId,
    });
    if (result.success && result.data) {
      setContent('');
      toast.message(result.message);
      updateList(result.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-end gap-4'>
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        className='w-full h-28 text-lg'
        placeholder='댓글을 작성해주세요.'
        value={content}
      />
      <Button type='submit' className='w-20 h-10'>
        등록
      </Button>
    </form>
  );
}
