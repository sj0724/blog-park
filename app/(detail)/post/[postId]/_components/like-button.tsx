'use client';

import { createLike } from '@/app/action/like';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LikeButton({
  postId,
  personalStatus,
  createrId,
}: {
  postId: string;
  personalStatus: boolean;
  createrId: string;
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
    <div className='shadow-md border rounded-full p-2'>
      {isLike ? (
        <Heart
          size={30}
          fill='red'
          stroke='red'
          className='cursor-pointer'
          onClick={handleLike}
        />
      ) : (
        <Heart
          size={30}
          fill='white'
          className='cursor-pointer'
          onClick={handleLike}
        />
      )}
    </div>
  );
}
