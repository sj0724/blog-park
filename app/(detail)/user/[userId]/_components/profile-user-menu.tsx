import { Heart, LayoutList, UserPlus } from 'lucide-react';
import ProfileMenuButton from './profile-menu-button';

export default function ProfileUserMenu({ menu }: { menu: string }) {
  return (
    <div className='flex justify-between w-full lg:px-10 px-5 py-5 mb-5'>
      <ProfileMenuButton id='list' currentMenu={menu}>
        <LayoutList size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton id='follow' currentMenu={menu}>
        <UserPlus size={30} />
      </ProfileMenuButton>
      <ProfileMenuButton id='like' currentMenu={menu}>
        <Heart size={30} />
      </ProfileMenuButton>
    </div>
  );
}
