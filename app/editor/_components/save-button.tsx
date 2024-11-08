'use client';

import { createTemporary, updateTemporary } from '@/app/action/teporary-post';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  id: string | null;
  title: string;
  content: string;
}

export default function SaveButton({ id, title, content }: Props) {
  const router = useRouter();

  const isSave = async () => {
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
  };

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
