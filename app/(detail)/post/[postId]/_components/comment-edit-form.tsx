import { editComment } from '@/app/action/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  content: string;
  toggleEdit: () => void;
  postId: string;
  commentId: string;
}

export default function CommentEditForm({
  content,
  toggleEdit,
  postId,
  commentId,
}: Props) {
  const router = useRouter();
  const formatContent = content.replace(/<br\s*\/?>/gi, '\n');
  const [newContent, setNewContent] = useState(formatContent);
  const isEditComment = async () => {
    const result = await editComment({
      commentId,
      content: newContent,
      postId,
    });
    if (result.success) {
      toast.message(result.message);
      router.refresh();
      toggleEdit();
    }
  };

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
        <Button onClick={isEditComment} type='button'>
          확인
        </Button>
      </div>
    </div>
  );
}
