'use client';

import { createComment } from '@/app/action/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState('');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formatContent = content.replace(/\n/g, '<br>');
    const result = await createComment({ postId, content: formatContent });
    if (result.success) {
      router.refresh();
    }
    toast.message(result.message);
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-end gap-4'>
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        className='w-full h-28 text-lg'
        placeholder='댓글을 작성해주세요.'
      />
      <Button type='submit' className='w-20 h-10'>
        등록
      </Button>
    </form>
  );
}
