import { Heart, LayoutList, UserPlus } from 'lucide-react';
import ProfileMenuButton from './\bprofile-menu-button';

export default function ProfileUserMenu({
  menu,
  userId,
}: {
  menu: string;
  userId: string;
}) {
  console.log(menu);
  return (
    <div className='flex justify-between w-full px-10 py-5'>
      <ProfileMenuButton
        text='내 포스트'
        href={`/user/${userId}?menu=list`}
        id='list'
        currentMenu={menu}
      >
        <LayoutList size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton
        text='팔로우'
        href={`/user/${userId}?menu=follow`}
        id='follow'
        currentMenu={menu}
      >
        <UserPlus size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton
        text='좋아요'
        href={`/user/${userId}?menu=like`}
        id='like'
        currentMenu={menu}
      >
        <Heart size={30} />
      </ProfileMenuButton>
    </div>
  );
}
