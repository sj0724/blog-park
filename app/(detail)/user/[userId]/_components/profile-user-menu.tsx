import { Heart, LayoutList, UserPlus } from 'lucide-react';
import ProfileMenuButton from './profile-menu-button';

export default function ProfileUserMenu({
  menu,
  userId,
}: {
  menu: string;
  userId: string;
}) {
  return (
    <div className='flex justify-between w-full lg:px-10 px-5 py-5 mb-5'>
      <ProfileMenuButton
        href={`/user/${userId}?menu=list`}
        id='list'
        currentMenu={menu}
      >
        <LayoutList size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton
        href={`/user/${userId}?menu=follow`}
        id='follow'
        currentMenu={menu}
      >
        <UserPlus size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton
        href={`/user/${userId}?menu=like`}
        id='like'
        currentMenu={menu}
      >
        <Heart size={30} />
      </ProfileMenuButton>
    </div>
  );
}
