import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Spinner from './spinner';
import { CircleUser } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  image?: string | null;
  size: Size;
}

const avatarSize = {
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-36 h-36',
};

export function UserAvatar({ image, size }: Props) {
  return (
    <Avatar className={avatarSize[size]}>
      <AvatarImage src={image ? image : ''} alt='프로필이미지' />
      <AvatarFallback>
        {image ? <Spinner /> : <CircleUser size={30} />}
      </AvatarFallback>
    </Avatar>
  );
}
