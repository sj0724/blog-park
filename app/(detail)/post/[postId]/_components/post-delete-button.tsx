'use client';

import { deletePost } from '@/app/action/post';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PostDeleteButton({ postId }: { postId: string }) {
  const router = useRouter();
  const isDelete = async () => {
    const result = await deletePost(postId);
    if (result.success) {
      toast.message(result.message);
      router.replace('/post/list');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className='cursor-pointer'>삭제</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 포스트는 복구할수 없습니다.
            <br />
            삭제를 원하신다면 하단 삭제하기 버튼을 눌러주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <Button type='button' onClick={isDelete}>
            삭제하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
