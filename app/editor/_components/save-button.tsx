'use client';

import { createTemporary, updateTemporary } from '@/app/action/teporary-post';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
  id: string | null;
  title: string;
  content: string;
}

export default function SaveButton({ id, title, content }: Props) {
  const router = useRouter();

  const isSave = useCallback(async () => {
    if (id) {
      const result = await updateTemporary({
        id,
        title,
        content,
      });
      if (result) {
        toast.success(result.message);
      }
    } else {
      const result = await createTemporary({
        title,
        content,
      });
      if (result) {
        toast.success(result.message);
        router.push(`/editor/create?id=${result.data?.id}`);
      }
    }
  }, [content, id, router, title]);

  useEffect(() => {
    // 1분마다 isSave 함수 실행
    const timer = setTimeout(isSave, 60 * 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [id, title, content, isSave]); // id, title, content가 변경될 때마다 타이머 재설정

  return (
    <Button
      type='button'
      className='w-24 h-12 font-semibold text-lg bg-blue-100 text-black hover:bg-gray-200'
      onClick={isSave}
    >
      임시저장
    </Button>
  );
}
