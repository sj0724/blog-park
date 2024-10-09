'use client';

import Link from 'next/link';
import { deletePost } from '@/app/action/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DeleteButton from './post-delete-button';
import { useState } from 'react';

export default function PostButtonContainer({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDeletePost = async () => {
    const result = await deletePost(postId);
    if (result.success) {
      setIsOpen(!isOpen);
      toast.message(result.message);
      router.replace('/');
    }
  };

  return (
    <div className='flex gap-2 h-fit'>
      <Link href={`/post/edit/${postId}`} className='h-fit'>
        <p className='text-gray-400'>수정</p>
      </Link>
      <DeleteButton
        isDelete={isDeletePost}
        open={isOpen}
        setModalOpen={setIsOpen}
      />
    </div>
  );
}
