'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  isDelete: () => void;
}

export default function DeleteButton({ isDelete }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-red-500 hover:bg-red-400'>삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제가 완료되면 복구할 수 없습니다.
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
