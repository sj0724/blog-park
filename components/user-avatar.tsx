import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserAvatar({ image }: { image: string | null }) {
  return (
    <Avatar className='w-14 h-14'>
      <AvatarImage src={image ? image : ''} alt='프로필이미지' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
