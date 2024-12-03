import { Heart, LayoutList, UserPlus } from 'lucide-react';
import ProfileMenuButton from './profile-menu-button';

interface Props {
  menu: string;
  userId: string;
}

const menuList = [
  { id: 'list', icon: <LayoutList size={30} /> },
  { id: 'follow', icon: <UserPlus size={30} /> },
  { id: 'like', icon: <Heart size={30} /> },
];

export default function ProfileUserMenu({ menu, userId }: Props) {
  return (
    <div className='flex justify-between w-full lg:px-10 px-5 py-5 mb-5'>
      {menuList.map(({ id, icon }) => (
        <ProfileMenuButton id={id} currentMenu={menu} key={id} userId={userId}>
          {icon}
        </ProfileMenuButton>
      ))}
    </div>
  );
}
