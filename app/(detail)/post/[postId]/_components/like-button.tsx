'use client';

import { createLike } from '@/app/action/like';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LikeButton({
  postId,
  personalStatus,
  createrId,
  size,
}: {
  postId: string;
  personalStatus: boolean;
  createrId: string;
  size: number;
}) {
  const [isLike, setIsLike] = useState(personalStatus);
  const handleLike = async () => {
    const result = await createLike({ postId, createrId });
    if (result.success) {
      setIsLike(!isLike);
      toast.message(result.message);
    } else {
      toast.message(result.message);
    }
  };

  return (
    <>
      {isLike ? (
        <Heart
          size={size}
          fill='red'
          stroke='red'
          className='cursor-pointer'
          onClick={handleLike}
        />
      ) : (
        <Heart
          size={size}
          fill='white'
          className='cursor-pointer'
          onClick={handleLike}
        />
      )}
    </>
  );
}
