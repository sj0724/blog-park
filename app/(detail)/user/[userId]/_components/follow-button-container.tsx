'use client';

import { toggleFollow } from '@/app/action/follow';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FollowButtonContainer({
  userId,
  followStatus,
}: {
  userId: string;
  followStatus: boolean;
}) {
  const [isFollow, setIsFollow] = useState(followStatus);
  const handleFollow = async () => {
    setIsFollow(!isFollow);
    const result = await toggleFollow(userId);
    toast.message(result.message);
  };

  return (
    <Button type='button' onClick={handleFollow} className='w-48'>
      {isFollow ? '팔로우중' : '팔로우'}
    </Button>
  );
}
