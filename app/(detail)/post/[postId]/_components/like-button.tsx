'use client';

import { createLike } from '@/app/action/like';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function LikeButton({
  postId,
  personalStatus,
}: {
  postId: string;
  personalStatus: boolean;
}) {
  const isLike = async () => {
    const result = await createLike({ postId });
    if (result) {
      toast.message(result.message);
    }
  };

  return (
    <>
      {personalStatus ? (
        <Heart
          size={30}
          fill='red'
          stroke='red'
          className='cursor-pointer'
          onClick={isLike}
        />
      ) : (
        <Heart size={30} className='cursor-pointer' onClick={isLike} />
      )}
    </>
  );
}
