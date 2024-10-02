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
    if (result.success) {
      toast.message(result.message);
    } else {
      toast.message(result.message);
    }
  };

  return (
    <div className='shadow-md border rounded-full p-2'>
      {personalStatus ? (
        <Heart
          size={30}
          fill='red'
          stroke='red'
          className='cursor-pointer'
          onClick={isLike}
        />
      ) : (
        <Heart
          size={30}
          fill='white'
          className='cursor-pointer'
          onClick={isLike}
        />
      )}
    </div>
  );
}
